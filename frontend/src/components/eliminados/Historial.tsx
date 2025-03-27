// src/components/eliminados/Historial.tsx
import React, { useState, useEffect } from 'react';
import { fetchSensorData } from '../../services/api';

interface Parcela {
  id: number;
  nombre: string;
  ubicacion: string;
  responsable: string;
  tipo_cultivo: string;
  ultimo_riego: string;
}

const Historial: React.FC = () => {
  const [allParcelas, setAllParcelas] = useState<Parcela[]>([]);
  const [currentParcelas, setCurrentParcelas] = useState<Parcela[]>([]);
  const [deletedParcelas, setDeletedParcelas] = useState<Parcela[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSensorData();
        const newParcelas = data.parcelas;
        
        // Detect parcelas eliminadas
        if (allParcelas.length > 0) {
          const newDeleted = allParcelas.filter(
            oldParcela => !newParcelas.some(newParcela => newParcela.id === oldParcela.id)
          );
          setDeletedParcelas(prev => [...newDeleted, ...prev]);
        }
        
        setAllParcelas(newParcelas);
        setCurrentParcelas(newParcelas);
      } catch (error) {
        console.error('Error loading parcelas:', error);
      }
    };

    loadData();
    const interval = setInterval(loadData, 30000); // Actualizar cada 30 segundos

    return () => clearInterval(interval);
  }, [allParcelas]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Historial de parcelas eliminadas</h2>
      {deletedParcelas.length === 0 ? (
        <p>No hay parcelas eliminadas recientemente.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Nombre</th>
                <th className="py-2 px-4">Ubicación</th>
                <th className="py-2 px-4">Responsable</th>
                <th className="py-2 px-4">Tipo de Cultivo</th>
                <th className="py-2 px-4">Último Riego</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {deletedParcelas.map(parcela => (
                <tr key={parcela.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-2 px-4">{parcela.id}</td>
                  <td className="py-2 px-4">{parcela.nombre}</td>
                  <td className="py-2 px-4">{parcela.ubicacion}</td>
                  <td className="py-2 px-4">{parcela.responsable}</td>
                  <td className="py-2 px-4">{parcela.tipo_cultivo}</td>
                  <td className="py-2 px-4">{new Date(parcela.ultimo_riego).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Historial;