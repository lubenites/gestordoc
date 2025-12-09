
import React from 'react';
import { Area, Permiso } from './types';
import RegisterDocument from './components/RegisterDocument';
import AttachDocument from './components/AttachDocument';
import Sidebar from './components/Sidebar';
import UserManager from './components/UserManager';
import RoleManager from './components/RoleManager';
import DocumentTracker from './components/DocumentTracker';
import Search from './components/Search';
import Reports from './components/Reports';
import AuditTrail from './components/AuditTrail';
import Login from './components/Login';
import LogoutIcon from './components/icons/LogoutIcon';

import { AuthProvider, useAuth } from './context/AuthContext';
import { DocumentProvider } from './context/DocumentContext';
import { UserProvider } from './context/UserContext';
import { UIProvider, useUI } from './context/UIContext';
import { RoleProvider, useRoles } from './context/RoleContext';


const App: React.FC = () => {
  return (
    <AuthProvider>
      <ContenidoApp />
    </AuthProvider>
  );
};

const ContenidoApp: React.FC = () => {
  const { usuario } = useAuth();
  
  if (!usuario) {
    return <Login />;
  }

  return (
    <UIProvider>
      <DocumentProvider>
        <RoleProvider>
          <UserProvider>
              <LayoutPrincipal />
          </UserProvider>
        </RoleProvider>
      </DocumentProvider>
    </UIProvider>
  );
};

const LayoutPrincipal: React.FC = () => {
  const { usuario, cerrarSesion } = useAuth();
  const { vistaActual } = useUI();
  const { roles } = useRoles();
  
  const tienePermisoParaVista = (vista: string) => {
    if(!usuario?.permisos) return false;
    const permisos = usuario.permisos;
    switch(vista) {
      case 'registrar': return permisos.includes(Permiso.REGISTRAR_DOCUMENTO_VENTAS);
      case 'anexar': return permisos.some(p => p.startsWith('anexar-documento'));
      case 'seguimiento': return permisos.some(p => p.startsWith('acceso-seguimiento'));
      case 'busqueda': return permisos.some(p => p.startsWith('acceso-busqueda'));
      case 'reportes': return permisos.some(p => p.startsWith('acceso-reportes'));
      case 'auditoria': return permisos.some(p => p.startsWith('acceso-auditoria'));
      case 'usuarios': return permisos.includes(Permiso.GESTIONAR_USUARIOS);
      case 'roles': return permisos.includes(Permiso.GESTIONAR_ROLES);
      default: return false;
    }
  }

  const obtenerInfoEncabezado = () => {
    switch (vistaActual) {
      case 'registrar':
        return { titulo: 'Registrar Documento (Ventas)', descripcion: 'Registre el documento inicial para comenzar el flujo de trabajo.' };
      case 'anexar':
        return { titulo: 'Anexar Documento por Área', descripcion: 'Busque una OC para anexar el documento correspondiente a su área.' };
      case 'seguimiento':
        return { titulo: 'Tracking Documentario', descripcion: 'Visualice el estado del flujo de trabajo de todos los documentos.' };
      case 'usuarios':
        return { titulo: 'Gestión de Usuarios', descripcion: 'Añada, edite o elimine usuarios del sistema.' };
      case 'roles':
        return { titulo: 'Gestión de Roles', descripcion: 'Defina los roles y permisos de los usuarios.' };
      case 'busqueda':
        return { titulo: 'Búsqueda Avanzada', descripcion: 'Encuentre documentos por OC, contenido o filtros.' };
      case 'reportes':
        return { titulo: 'Panel de Reportería', descripcion: 'Visualice métricas y gráficos sobre el flujo de documentos.' };
      case 'auditoria':
        return { titulo: 'Auditoría de Documentos', descripcion: 'Rastree todas las interacciones y cambios por OC.' };
      default:
        return { titulo: 'Gestor Documentario', descripcion: 'Bienvenido al sistema de gestión.' };
    }
  };
  
  const { titulo, descripcion } = obtenerInfoEncabezado();

  const renderizarAccesoDenegado = () => (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold text-red-600">Acceso Denegado</h2>
      <p className="text-slate-600 mt-2">No tiene los permisos necesarios para acceder a esta sección.</p>
    </div>
  );

  if (!usuario) return null;
  const nombreRol = roles.find(r => r.id === usuario.rolId)?.nombre || 'Rol no definido';

  const renderizarVista = () => {
    if (!tienePermisoParaVista(vistaActual)) {
      return renderizarAccesoDenegado();
    }
    switch (vistaActual) {
      case 'registrar': return <RegisterDocument />;
      case 'anexar': return <AttachDocument />;
      case 'seguimiento': return <DocumentTracker />;
      case 'busqueda': return <Search />;
      case 'reportes': return <Reports />;
      case 'auditoria': return <AuditTrail />;
      case 'usuarios': return <UserManager />;
      case 'roles': return <RoleManager />;
      default: return <div />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800 font-sans">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 flex items-center justify-between px-8 border-b border-slate-200 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{titulo}</h2>
            <p className="text-sm text-slate-500">{descripcion}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-slate-700">{usuario.nombres} {usuario.apellidos}</p>
              <p className="text-xs text-slate-500 capitalize">{nombreRol}</p>
            </div>
            <button
              onClick={cerrarSesion}
              className="p-2 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-full transition"
              title="Cerrar Sesión"
            >
              <LogoutIcon className="w-6 h-6" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
            {renderizarVista()}
        </main>
      </div>
    </div>
  );
}

export default App;
