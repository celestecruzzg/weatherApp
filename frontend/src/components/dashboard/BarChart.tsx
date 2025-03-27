// src/components/dashboard/BarChart.tsx
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchSensorData } from '../../services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart: React.FC = () => {
  const [parcelas, setParcelas] = useState<any[]>([]);
  const [selectedParcela, setSelectedParcela] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSensorData();
        setParcelas(data.parcelas);
        if (data.parcelas.length > 0 && !selectedParcela) {
          setSelectedParcela(data.parcelas[0].id);
        }
      } catch (error) {
        console.error('Error loading parcelas:', error);
      }
    };

    loadData();
  }, []);

  const selectedData = parcelas.find((p: any) => p.id === selectedParcela);

  const data = {
    labels: ['Humedad', 'Temperatura', 'Lluvia', 'Sol'],
    datasets: [
      {
        label: 'Valores del Sensor',
        data: selectedData
          ? [
              selectedData.sensor.humedad,
              selectedData.sensor.temperatura,
              selectedData.sensor.lluvia,
              selectedData.sensor.sol,
            ]
          : [],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)', // verde
          'rgba(239, 68, 68, 0.7)', // rojo
          'rgba(59, 130, 246, 0.7)', // azul
          'rgba(245, 158, 11, 0.7)', // amarillo
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(245, 158, 11, 1)',
        ],
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#FFFFFF',
        titleColor: '#1F2937',
        bodyColor: '#1F2937',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label +=
                context.parsed.y +
                (context.label === 'Temperatura'
                  ? '°C'
                  : context.label === 'Humedad' || context.label === 'Sol'
                  ? '%'
                  : 'mm');
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#E5E7EB',
          drawBorder: false,
        },
        ticks: {
          color: '#6B7280',
          callback: (value: any) => value + (value === 0 ? '' : value === 100 ? '%' : ''),
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#6B7280',
        },
      },
    },
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-3 p-3">
        <h2 className="text-[14px] font-semibold text-[var(--text-black)]">
          Comparación de<br/> sensores
        </h2>
        <select
          className="text-sm rounded-md border border-[#E0E7FF] bg-[#F3F8FF] px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedParcela || ''}
          onChange={(e) => setSelectedParcela(Number(e.target.value))}
        >
          {parcelas.map((parcela: any) => (
            <option key={parcela.id} value={parcela.id}>
              {parcela.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;