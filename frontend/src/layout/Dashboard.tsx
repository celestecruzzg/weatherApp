import { ReactNode } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function Dashboard({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-[#F3F8FF] shadow-md">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}