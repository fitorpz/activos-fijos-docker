import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { RegistroUsuario } from './pages/RegistroUsuario';
import RecuperarContrasena from './pages/RecuperarContrasena';
import PrimeraVez from './pages/PrimeraVez';
import CuentaDeshabilitada from './pages/CuentaDeshabilitada';
import PanelControl from './pages/PanelControl';
import Layout from './components/Layout';
import { EditarUsuario } from './pages/EditarUsuario';
import Usuarios from './pages/Usuarios';

function App() {
  // ✅ Nueva validación basada en existencia de token
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token; // true si existe token

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistroUsuario />} />
        <Route path="/recuperar" element={<RecuperarContrasena />} />
        <Route path="/primera-vez" element={<PrimeraVez />} />
        <Route path="/deshabilitada" element={<CuentaDeshabilitada />} />

        {/* Rutas privadas */}
        {isAuthenticated && (
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/panel-control" element={<PanelControl />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/usuarios/crear" element={<RegistroUsuario />} />
            <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />
          </Route>
        )}

        {/* Redirigir si no está autenticado */}
        {!isAuthenticated && (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
