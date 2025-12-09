
import React, { useMemo } from 'react';
import { Vista, Permiso } from '../types';
import { useUI } from '../context/UIContext';
import { useAuth } from '../context/AuthContext';
import DocumentPlusIcon from './icons/DocumentPlusIcon';
import DocumentAttachIcon from './icons/DocumentAttachIcon';
import UsersIcon from './icons/UsersIcon';
import RolesIcon from './icons/RolesIcon';
import ClipboardListIcon from './icons/ClipboardListIcon';
import MagnifyingGlassIcon from './icons/MagnifyingGlassIcon';
import ChartBarIcon from './icons/ChartBarIcon';
import HistoryIcon from './icons/HistoryIcon';

const itemsNavegacion = [
    { id: 'registrar', label: 'Registrar Documento', icon: DocumentPlusIcon },
    { id: 'anexar', label: 'Anexar Documento', icon: DocumentAttachIcon },
    { id: 'seguimiento', label: 'Tracking Documentario', icon: ClipboardListIcon },
    { id: 'busqueda', label: 'Búsqueda', icon: MagnifyingGlassIcon },
    { id: 'reportes', label: 'Reportería', icon: ChartBarIcon },
    { id: 'auditoria', label: 'Auditoría', icon: HistoryIcon },
    { id: 'usuarios', label: 'Usuarios', icon: UsersIcon },
    { id: 'roles', label: 'Roles', icon: RolesIcon },
];

const Sidebar: React.FC = () => {
  const { vistaActual, setVistaActual } = useUI();
  const { usuario: usuarioLogueado } = useAuth();
  
  const itemsNavegacionVisibles = useMemo(() => {
    if (!usuarioLogueado?.permisos) return [];
    
    const tienePermisoParaVista = (vistaId: string) => {
      const permisos = usuarioLogueado.permisos;
      switch(vistaId) {
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

    return itemsNavegacion.filter(item => tienePermisoParaVista(item.id));

  }, [usuarioLogueado]);

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col">
      <div className="h-20 flex items-center px-6 border-b border-slate-200">
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500">
          Gestor Documentario
        </h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {itemsNavegacionVisibles.map(item => {
            const esActivo = vistaActual === item.id;
            const Icono = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setVistaActual(item.id as Vista)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors duration-200 ${
                    esActivo
                      ? 'bg-sky-100 text-sky-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  aria-current={esActivo ? 'page' : undefined}
                >
                  <Icono className="w-6 h-6" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
