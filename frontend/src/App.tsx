import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DashboardIndex from "./pages/DashboardIndex";
import { AuthPage } from "./pages/AuthPage";
import Parcelas from "./pages/Parcelas";
import Eliminados from "./pages/Eliminados";
import { Toaster } from "react-hot-toast"; // Importa Toaster

export default function App() {
  return (
    <Router>
      {/* Agrega el componente Toaster aquí */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#363636',
          },
        }}
      />
      
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/" element={<AuthPage />} />
        
        {/* Rutas anidadas del dashboard */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardIndex />} />
          <Route path="parcelas" element={<Parcelas />} />
          <Route path="eliminados" element={<Eliminados />} />
        </Route>
      </Routes>
    </Router>
  );
}