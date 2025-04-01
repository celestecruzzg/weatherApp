import { Outlet } from 'react-router-dom';
import DashboardLayout from '../layout/Dashboard';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}