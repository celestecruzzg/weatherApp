import { useState, useEffect } from 'react';
import axios from 'axios';

// Define la URL base para las peticiones a la API
const api = axios.create({
  baseURL: '/iotapp',  // Se puede ajustar dependiendo de la configuración de tu proxy
});

interface SensorData {
  temperatura: number;
  humedad: number;
  lluvia: number;
  sol: number;
}

export default function Sensores() {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar la llamada a la API usando axios
        const response = await api.get('/test'); // Aquí no necesitas repetir '/iotapp'
        setSensorData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
        setError("Hubo un error al cargar los datos.");
        setLoading(false);
      }
    };
    
    fetchData();
    
    // Actualizar datos cada 30 segundos
    const interval = setInterval(fetchData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <p>Cargando datos de sensores...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-sm font-medium text-gray-500">Temperatura</h3>
        <p className="text-2xl font-bold mt-2">
          {sensorData?.temperatura} °C
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-sm font-medium text-gray-500">Humedad</h3>
        <p className="text-2xl font-bold mt-2">
          {sensorData?.humedad}%
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-sm font-medium text-gray-500">Lluvia</h3>
        <p className="text-2xl font-bold mt-2">
          {sensorData?.lluvia}%
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-sm font-medium text-gray-500">Sol</h3>
        <p className="text-2xl font-bold mt-2">
          {sensorData?.sol}%
        </p>
      </div>
    </div>
  );
}
