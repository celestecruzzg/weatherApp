// src/components/dashboard/Sensors.tsx
import React, { useEffect, useState } from 'react';
import { fetchSensorData } from '../../services/api';

// Componente de ícono reutilizable
const SensorIcon = ({ children, color }: { children: React.ReactNode, color: string }) => (
  <div className={`p-2 rounded-lg ${color} bg-opacity-20`}>
    {children}
  </div>
);

const HumidityIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
);

const TemperatureIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const RainIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
  </svg>
);

const SunIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const Sensores: React.FC = () => {
  const [sensorData, setSensorData] = useState({
    humedad: 0,
    temperatura: 0,
    lluvia: 0,
    sol: 0
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSensorData();
        setSensorData(data.sensores);
      } catch (error) {
        console.error('Error loading sensor data:', error);
      }
    };

    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      icon: <HumidityIcon />,
      iconColor: 'text-blue-500',
      title: 'Humedad',
      value: `${sensorData.humedad}%`,
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    {
      icon: <TemperatureIcon />,
      iconColor: 'text-red-500',
      title: 'Temperatura',
      value: `${sensorData.temperatura}°C`,
      bg: 'bg-red-50',
      border: 'border-red-100'
    },
    {
      icon: <RainIcon />,
      iconColor: 'text-indigo-500',
      title: 'Lluvia',
      value: `${sensorData.lluvia}mm`,
      bg: 'bg-indigo-50',
      border: 'border-indigo-100'
    },
    {
      icon: <SunIcon />,
      iconColor: 'text-amber-500',
      title: 'Sol',
      value: `${sensorData.sol}%`,
      bg: 'bg-amber-50',
      border: 'border-amber-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-3 w-full h-full">
      {cards.map((card, index) => (
        <div 
          key={index}
          className={`${card.bg} border ${card.border} rounded-xl p-4 flex flex-col shadow-sm`}
        >
          <div className="flex justify-between items-start">
            <SensorIcon color={card.iconColor}>{card.icon}</SensorIcon>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              index === 0 ? (sensorData.humedad > 50 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800') :
              index === 1 ? (sensorData.temperatura > 25 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800') :
              index === 2 ? (sensorData.lluvia > 5 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800') :
              (sensorData.sol > 50 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')
            }`}>
              {index === 0 ? (sensorData.humedad > 50 ? '↑' : '↓') :
               index === 1 ? (sensorData.temperatura > 25 ? '↑' : '↓') :
               index === 2 ? (sensorData.lluvia > 5 ? '↑' : '↓') :
               (sensorData.sol > 50 ? '↑' : '↓')}
            </span>
          </div>
          
          <h3 className="text-gray-500 text-sm font-medium mt-2">{card.title}</h3>
          <p className="text-2xl font-bold text-gray-800 mt-1">{card.value}</p>
          
          <div className="mt-3">
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${card.iconColor.replace('text-', 'bg-')}`}
                style={{ 
                  width: `${index === 0 ? sensorData.humedad : 
                          index === 1 ? (sensorData.temperatura / 50 * 100) : 
                          index === 2 ? (sensorData.lluvia / 20 * 100) : 
                          sensorData.sol}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sensores;