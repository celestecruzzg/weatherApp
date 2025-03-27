// src/components/dashboard/RadarChart.tsx
import React, { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import { fetchSensorData } from '../../services/api';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart: React.FC = () => {
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
        label: 'Equilibrio de Sensores',
        data: selectedData
          ? [
              selectedData.sensor.humedad,
              selectedData.sensor.temperatura,
              selectedData.sensor.lluvia,
              selectedData.sensor.sol,
            ]
          : [],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
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
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.r !== null) {
              label +=
                context.parsed.r +
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
      r: {
        angleLines: {
          color: '#E5E7EB',
        },
        grid: {
          color: '#E5E7EB',
        },
        pointLabels: {
          color: '#6B7280',
          font: {
            size: 11,
          },
        },
        ticks: {
          display: false,
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-3 p-3">
        <h2 className="text-[14px] font-semibold text-[var(--text-black)]">
          Equilibrio de Sensores
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
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

export default RadarChart;