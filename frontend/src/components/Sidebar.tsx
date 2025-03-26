import { DashboardIcon, DrawingPinIcon, TrashIcon } from '@radix-ui/react-icons';
import Logo from '../assets/icons/logo.svg';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-58 bg-white shadow-md">
      <div className="p-4 flex items-center">
        <img src={Logo} alt="Weather App Logo" className="h-12" />
      </div>
      <nav className="mt-3 px-4">
        <div className="p-[0.7px] bg-gray-200 mb-3"></div>
        <h3 className='mt-4 text-xs text-gray-400 font-sm'>MENU</h3>
        <div className="mt-8 space-y-4 text-sm">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) => 
              `flex font-base items-center px-4 py-2 ${isActive ? 'text-[var(--text-blue)] bg-[var(--color-light-blue)]' : 'text-gray-400 hover:bg-[var(--color-base-blue)] hover:text-[var(--text-blue)]'}`
            }
          >
            <DashboardIcon className="mr-3" />
            Dashboard
          </NavLink>
          <NavLink
            to="/dashboard/parcelas"
            className={({ isActive }) => 
              `flex font-base items-center px-4 py-2 ${isActive ? 'text-[var(--text-blue)] bg-[var(--color-light-blue)]' : 'text-gray-400 hover:bg-[var(--color-base-blue)] hover:text-[var(--text-blue)]'}`
            }
          >
            <DrawingPinIcon className="mr-3" />
            Parcelas
          </NavLink>
          <NavLink
            to="/dashboard/eliminados"
            className={({ isActive }) => 
              `flex font-base items-center px-4 py-2 ${isActive ? 'text-[var(--text-blue)] bg-[var(--color-light-blue)]' : 'text-gray-400 hover:bg-[var(--color-base-blue)] hover:text-[var(--text-blue)]'}`
            }
          >
            <TrashIcon className="mr-3" />
            Eliminados
          </NavLink>
        </div>
      </nav>
    </div>
  );
}