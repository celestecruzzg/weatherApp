// src/services/api.ts
const API_URL = 'https://moriahmkt.com/iotapp/test/';

export const fetchSensorData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener datos de sensores');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    throw error;
  }
};