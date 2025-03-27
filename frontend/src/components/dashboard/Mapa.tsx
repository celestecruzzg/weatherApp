// src/components/dashboard/Mapa.tsx
import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { fetchSensorData } from '../../services/api';

mapboxgl.accessToken = "pk.eyJ1IjoiY2VsZXN0ZWNydXp6ZyIsImEiOiJjbTI5MDluYW4wMDloMmxweWIwc3oxcDl3In0.UtROlXtGKA46QV57BFnqAQ";

interface Parcela {
  id: number;
  nombre: string;
  ubicacion: string;
  responsable: string;
  tipo_cultivo: string;
  latitud: number;
  longitud: number;
}

const Mapa: React.FC = () => {
  const [parcelas, setParcelas] = useState<Parcela[]>([]);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSensorData();
        setParcelas(data.parcelas);
      } catch (error) {
        console.error('Error loading parcelas:', error);
      }
    };

    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!mapContainer.current || parcelas.length === 0) return;

    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-86.88, 21.07],
        zoom: 8,
        attributionControl: false
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Watermark minimalista
      const watermark = document.createElement('div');
      watermark.className = 'absolute bottom-1 right-1 text-xs text-gray-500';
      watermark.innerHTML = '© Mapboxgl';
      mapContainer.current.appendChild(watermark);
    }

    // Limpiar marcadores existentes
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Crear nuevos marcadores con popups mejorados
    parcelas.forEach(parcela => {
      const popupContent = document.createElement('div');
      popupContent.className = 'popup-container';
      popupContent.innerHTML = `
        <div class="bg-white rounded-lg shadow-xl overflow-hidden w-52">
          <div class="bg-indigo-600 p-3">
            <h3 class="text-white font-bold text-lg">${parcela.nombre}</h3>
          </div>
          <div class="p-3 space-y-2">
            <div class="flex items-start">
              <svg class="w-4 h-4 mt-0.5 mr-2 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="text-sm text-gray-700">${parcela.ubicacion}</span>
            </div>
            <div class="flex items-start">
              <svg class="w-4 h-4 mt-0.5 mr-2 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span class="text-sm text-gray-700">${parcela.responsable}</span>
            </div>
            <div class="flex items-start">
              <svg class="w-4 h-4 mt-0.5 mr-2 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              <span class="text-sm text-gray-700">${parcela.tipo_cultivo}</span>
            </div>
          </div>
        </div>
      `;

      const popup = new mapboxgl.Popup({
        offset: 25,
        anchor: 'left',
        className: 'mapbox-popup' // Clase para estilos adicionales
      }).setDOMContent(popupContent);

      const marker = new mapboxgl.Marker({
        color: '#4F46E5',
        scale: 0.9
      })
        .setLngLat([parcela.longitud, parcela.latitud])
        .setPopup(popup)
        .addTo(map.current!);
      
      markers.current.push(marker);
    });

    // Ajustar vista
    if (parcelas.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      parcelas.forEach(parcela => bounds.extend([parcela.longitud, parcela.latitud]));
      map.current.fitBounds(bounds, { padding: 50, maxZoom: 14 });
    }

    return () => {
      markers.current.forEach(marker => marker.remove());
    };
  }, [parcelas]);

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-full rounded-lg shadow-md bg-gray-50"
      style={{ minHeight: '300px' }}
    />
  );
};

export default Mapa;