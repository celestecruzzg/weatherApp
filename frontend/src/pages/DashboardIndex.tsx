// src/pages/DashboardIndex.tsx
import Mapa from '../components/dashboard/Mapa';
import Sensores from '../components/dashboard/Sensores';
import LineChart from '../components/dashboard/LineChart';
import BarChart from '../components/dashboard/BarChart';
import RadarChart from '../components/dashboard/RadarChart';
import '../index.css'

export default function DashboardIndex() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-4 h-full">
            <h2 className="text-lg font-base text-[var(--text-black)] mb-4">Mapa de Parcelas</h2>
            <div className="h-96">
              <Mapa />
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h2 className="text-lg font-base text-[var(--text-black)] mb-4">Datos generales</h2>
            <Sensores />
          </div>
        </div>
      </div>
      
      {/* Sección de Gráficas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <LineChart />
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <BarChart />
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <RadarChart />
        </div>
      </div>

      <footer className="text-center text-xs text-gray-500 mt-8">
        © 2025. LeaderCode - Todos los derechos reservados.
      </footer>
    </div>
  );
}