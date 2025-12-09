
import React, { useState } from 'react';
import { Rol, Permiso } from '../types';
import { ESTRUCTURA_PERMISOS } from '../constants';
import { useRoles } from '../context/RoleContext';
import PermissionIcon from './icons/PermissionIcon';
import PlusIcon from './icons/PlusIcon';
import EditIcon from './icons/EditIcon';
import TrashIcon from './icons/TrashIcon';

const RoleManager: React.FC = () => {
  const { roles, agregarRol, actualizarRol, eliminarRol, cargando } = useRoles();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [rolEditando, setRolEditando] = useState<Rol | null>(null);
  const [nombreRol, setNombreRol] = useState('');
  const [permisosSeleccionados, setPermisosSeleccionados] = useState<Permiso[]>([]);

  const abrirModal = (rol: Rol | null = null) => {
    setRolEditando(rol);
    setNombreRol(rol ? rol.nombre : '');
    setPermisosSeleccionados(rol ? rol.permisos : []);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setRolEditando(null);
    setNombreRol('');
    setPermisosSeleccionados([]);
  };

  const handleCambioPermiso = (permiso: Permiso) => {
    setPermisosSeleccionados(prev =>
      prev.includes(permiso) ? prev.filter(p => p !== permiso) : [...prev, permiso]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombreRol.trim() === '') return;
    const datosRol = { nombre: nombreRol, permisos: permisosSeleccionados };
    if (rolEditando) {
      actualizarRol({ ...rolEditando, ...datosRol });
    } else {
      agregarRol(datosRol);
    }
    cerrarModal();
  };

  if (cargando) {
    return <p className="text-center p-8 text-slate-500">Cargando roles...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-slate-800">Listado de Roles</h3>
        <button onClick={() => abrirModal()} className="flex items-center justify-center px-4 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 transition">
          <PlusIcon className="w-5 h-5 mr-2" />
          Agregar Rol
        </button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200">
        <ul className="divide-y divide-slate-200">
          {roles.map(rol => (
            <li key={rol.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
              <div>
                <p className="font-bold text-lg text-slate-800">{rol.nombre}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {rol.permisos.map(p => <PermissionIcon key={p} permiso={p} />)}
                  {rol.permisos.length === 0 && <p className="text-xs text-slate-500 italic">Sin permisos asignados</p>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => abrirModal(rol)} className="p-2 text-slate-500 hover:text-sky-600"><EditIcon className="w-5 h-5" /></button>
                <button onClick={() => eliminarRol(rol.id)} className="p-2 text-slate-500 hover:text-red-600"><TrashIcon className="w-5 h-5" /></button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">{rolEditando ? 'Editar Rol' : 'Agregar Rol'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="roleName" className="block text-sm font-medium text-slate-600 mb-1">Nombre del Rol</label>
                <input id="roleName" type="text" value={nombreRol} onChange={e => setNombreRol(e.target.value)} required className="w-full px-4 py-2 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-sky-500"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Permisos</label>
                <div className="space-y-4 max-h-80 overflow-y-auto p-4 border rounded-md bg-slate-50">
                  {ESTRUCTURA_PERMISOS.map(({ grupo, permisos }) => {
                      const todosEnGrupoSeleccionados = permisos.every(p => permisosSeleccionados.includes(p.permiso));
                      const handleGrupoChange = () => {
                          const permisosDelGrupo = permisos.map(p => p.permiso);
                          if (todosEnGrupoSeleccionados) {
                              setPermisosSeleccionados(prev => prev.filter(p => !permisosDelGrupo.includes(p)));
                          } else {
                              setPermisosSeleccionados(prev => [...new Set([...prev, ...permisosDelGrupo])]);
                          }
                      };

                      return (
                          <div key={grupo} className="p-4 bg-white rounded-md border">
                              <label className="flex items-center space-x-3 cursor-pointer font-bold text-slate-800 border-b pb-3 mb-3">
                                  <input
                                      type="checkbox"
                                      checked={todosEnGrupoSeleccionados}
                                      onChange={handleGrupoChange}
                                      className="h-5 w-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                                  />
                                  <span>{grupo}</span>
                              </label>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-4">
                                  {permisos.map(({ permiso, descripcion }) => (
                                      <label key={permiso} className="flex items-center space-x-3 cursor-pointer p-1.5 hover:bg-slate-50 rounded-md">
                                          <input
                                              type="checkbox"
                                              checked={permisosSeleccionados.includes(permiso)}
                                              onChange={() => handleCambioPermiso(permiso)}
                                              className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                                          />
                                          <span className="text-sm text-slate-700">{descripcion}</span>
                                      </label>
                                  ))}
                              </div>
                          </div>
                      );
                  })}
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={cerrarModal} className="px-4 py-2 bg-slate-200 text-slate-800 font-semibold rounded-md hover:bg-slate-300">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManager;
