// src/types/sensor.ts
export interface SensorData {
    humedad: number;
    temperatura: number;
    lluvia: number;
    sol: number;
  }
  
  export interface Parcela {
    id: number;
    nombre: string;
    ubicacion: string;
    responsable: string;
    tipo_cultivo: string;
    ultimo_riego: string;
    sensor: SensorData;
    latitud: number;
    longitud: number;
  }
  
  export interface ApiResponse {
    sensores: SensorData;
    parcelas: Parcela[];
  }