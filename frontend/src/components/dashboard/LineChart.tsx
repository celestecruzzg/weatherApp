// src/components/dashboard/LineChart.tsx
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchSensorData } from '../../services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart: React.FC = () => {
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
    labels: ['Última lectura'],
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: selectedData ? [selectedData.sensor.temperatura] : [],
        borderColor: '#EF4444', // Rojo
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#EF4444',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Humedad (%)',
        data: selectedData ? [selectedData.sensor.humedad] : [],
        borderColor: '#3B82F6', // Azul
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#3B82F6',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#1F2937', // text-black
          font: {
            family: 'Inter, sans-serif',
            size: 12,
          },
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: '#FFFFFF',
        titleColor: '#1F2937',
        bodyColor: '#1F2937',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + (label.includes('Temperatura') ? '°C' : '%');
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: '#E5E7EB',
          drawBorder: false,
        },
        ticks: {
          color: '#6B7280',
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
        <h3 className="text-[14px] font-semibold text-[var(--text-black)]">
          Evolución de<br/> temperatura y humedad
        </h3>
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
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;