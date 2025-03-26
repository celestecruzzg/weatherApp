import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

// Configura tu token de Mapbox
mapboxgl.accessToken = "pk.eyJ1IjoiY2VsZXN0ZWNydXp6ZyIsImEiOiJjbTI5MDluYW4wMDloMmxweWIwc3oxcDl3In0.UtROlXtGKA46QV57BFnqAQ";

interface Parcela {
  id: number;
  nombre: string;
  latitud: number;
  longitud: number;
  tipo_cultivo: string;
}

export default function Mapa() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [parcelas, setParcelas] = useState<Parcela[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const fetchParcelas = async () => {
      try {
        // 1. Verificar conexión a internet
        if (!navigator.onLine) {
          throw new Error("No hay conexión a internet");
        }

        // 2. Realizar la petición a la API usando axios
        const response = await axios.get('/iotapp/test')

        
        const data = response.data;
        
        if (!Array.isArray(data)) {
          throw new Error("La respuesta no es un array válido");
        }

        setParcelas(data);
        setLoading(false);

        // 3. Inicializar el mapa solo si no existe
        if (map.current) return;

        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [-99.1332, 19.4326], // Coordenadas de CDMX como fallback
          zoom: 14
        });

        // Esperar a que el mapa esté listo
        map.current.on('load', () => {
          // 4. Añadir marcadores para cada parcela
          data.forEach(parcela => {
            // Validar coordenadas
            if (isNaN(parcela.longitud) || isNaN(parcela.latitud)) {
              console.warn(`Coordenadas inválidas para parcela ${parcela.id}`);
              return;
            }

            // Crear elemento HTML personalizado para el marcador
            const markerElement = document.createElement('div');
            markerElement.className = 'custom-marker';
            markerElement.innerHTML = `
              <div class="marker-pin"></div>
              <div class="marker-label">${parcela.nombre}</div>
            `;

            new mapboxgl.Marker(markerElement)
              .setLngLat([parcela.longitud, parcela.latitud])
              .setPopup(new mapboxgl.Popup({ offset: 25 })
                .setHTML(`
                  <h3 class="text-lg font-base">${parcela.nombre}</h3>
                  <p class="text-sm">Cultivo: ${parcela.tipo_cultivo}</p>
                `))
              .addTo(map.current!);
          });
        });

      } catch (err) {
        console.error("Error:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
        setLoading(false);
      }
    };

    fetchParcelas();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Estilos CSS para los marcadores
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .custom-marker {
        position: relative;
        width: 40px;
        height: 40px;
      }
      .marker-pin {
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        background: #3c82f6;
        transform: rotate(-45deg);
        position: absolute;
        left: 5px;
        top: 5px;
      }
      .marker-label {
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        font-size: 12px;
        font-weight: bold;
        color: white;
        background: #3c82f6;
        padding: 2px 6px;
        border-radius: 4px;
        display: none;
      }
      .mapboxgl-marker:hover .marker-label {
        display: block;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (error) {
    return (
      <div className="p-4 h-full">
        <h2 className="text-lg text-[var(--text-black)] font-base mb-4">Ubicación de parcelas</h2>
        <div className="flex items-center justify-center h-64 text-red-500">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 h-full">
      <h2 className="text-lg font-base text-[var(--text-black)] mb-4">Ubicación de parcelas</h2>
      {loading ? (
        <div className="flex bg-white rounded-lg shadow-md items-center justify-center h-64">
          <p className='text-[var(--text-black)]'>Cargando mapa...</p>
        </div>
      ) : (
        <>
          <div 
            ref={mapContainer} 
            className="h-96 rounded-md"
            style={{ minHeight: '400px' }}
          />
          <div className="mt-4">
            <h3 className="text-md font-medium mb-2">Parcelas registradas:</h3>
            {parcelas.length > 0 ? (
              <ul className="grid grid-cols-2 gap-2">
                {parcelas.map(parcela => (
                  <li key={parcela.id} className="bg-gray-50 p-2 rounded">
                    <strong>{parcela.nombre}</strong> - {parcela.tipo_cultivo}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No se encontraron parcelas</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
