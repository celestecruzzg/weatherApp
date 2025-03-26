import Mapa from '../components/dashboard/Mapa';
import Sensores from '../components/dashboard/Sensores';

export default function DashboardIndex() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Mapa />
        </div>
        <div className="lg:col-span-1">
          <div className="p-4 mb-6">
            <h2 className="text-lg font-base text-[var(--text-black)] mb-4">Datos generales</h2>
            <Sensores />
          </div>
        </div>
      </div>
      <footer className="text-center text-xs text-gray-500 mt-8">
        © 2025. LeaderCode - Todos los derechos reservados.
      </footer>
    </div>
  );
}