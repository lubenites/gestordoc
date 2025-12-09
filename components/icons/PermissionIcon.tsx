
import React from 'react';
import { Permiso } from '../../types';

interface PermissionIconProps {
  permiso: Permiso;
}

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);
const PencilIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);
const CogIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const baseStyles = {
    view: { icono: <EyeIcon />, clases: 'bg-blue-100 text-blue-800' },
    add: { icono: <PlusIcon />, clases: 'bg-green-100 text-green-800' },
    delete: { icono: <TrashIcon />, clases: 'bg-red-100 text-red-800' },
    edit: { icono: <PencilIcon />, clases: 'bg-yellow-100 text-yellow-800' },
    admin: { icono: <CogIcon />, clases: 'bg-purple-100 text-purple-800' },
    special: { icono: <EyeIcon />, clases: 'bg-indigo-100 text-indigo-800' },
};

const estilosPermiso: Record<Permiso, { icono: React.ReactElement; clases: string; descripcion: string }> = {
    // Admin
    [Permiso.GESTIONAR_USUARIOS]: { ...baseStyles.admin, descripcion: 'Gestionar Usuarios' },
    [Permiso.GESTIONAR_ROLES]: { ...baseStyles.admin, descripcion: 'Gestionar Roles' },
    [Permiso.VER_TODOS_LOS_DOCUMENTOS]: { ...baseStyles.special, descripcion: 'Ver Todo' },
    // Ventas
    [Permiso.REGISTRAR_DOCUMENTO_VENTAS]: { ...baseStyles.add, descripcion: 'Registrar (Ventas)' },
    [Permiso.ACCESO_SEGUIMIENTO_VENTAS]: { ...baseStyles.view, descripcion: 'Tracking (Ventas)' },
    [Permiso.ACCESO_BUSQUEDA_VENTAS]: { ...baseStyles.view, descripcion: 'Búsqueda (Ventas)' },
    [Permiso.ACCESO_REPORTES_VENTAS]: { ...baseStyles.view, descripcion: 'Reportes (Ventas)' },
    [Permiso.ACCESO_AUDITORIA_VENTAS]: { ...baseStyles.view, descripcion: 'Auditoría (Ventas)' },
    [Permiso.ELIMINAR_OC_VENTAS]: { ...baseStyles.delete, descripcion: 'Eliminar OC (Ventas)' },
    [Permiso.VER_REPORTES_AVANZADOS_VENTAS]: { ...baseStyles.special, descripcion: 'Reportes Avanzados (Ventas)' },
    // Compras
    [Permiso.ANEXAR_DOCUMENTO_COMPRAS]: { ...baseStyles.add, descripcion: 'Anexar (Compras)' },
    [Permiso.ACCESO_SEGUIMIENTO_COMPRAS]: { ...baseStyles.view, descripcion: 'Tracking (Compras)' },
    [Permiso.ACCESO_BUSQUEDA_COMPRAS]: { ...baseStyles.view, descripcion: 'Búsqueda (Compras)' },
    [Permiso.ACCESO_REPORTES_COMPRAS]: { ...baseStyles.view, descripcion: 'Reportes (Compras)' },
    [Permiso.ACCESO_AUDITORIA_COMPRAS]: { ...baseStyles.view, descripcion: 'Auditoría (Compras)' },
    [Permiso.EDITAR_ELIMINAR_ANEXO_COMPRAS]: { ...baseStyles.delete, descripcion: 'Eliminar Anexo (Compras)' },
    [Permiso.VER_REPORTES_AVANZADOS_COMPRAS]: { ...baseStyles.special, descripcion: 'Reportes Avanzados (Compras)' },
    // Facturación
    [Permiso.ANEXAR_DOCUMENTO_FACTURACION]: { ...baseStyles.add, descripcion: 'Anexar (Fact.)' },
    [Permiso.ACCESO_SEGUIMIENTO_FACTURACION]: { ...baseStyles.view, descripcion: 'Tracking (Fact.)' },
    [Permiso.ACCESO_BUSQUEDA_FACTURACION]: { ...baseStyles.view, descripcion: 'Búsqueda (Fact.)' },
    [Permiso.ACCESO_REPORTES_FACTURACION]: { ...baseStyles.view, descripcion: 'Reportes (Fact.)' },
    [Permiso.ACCESO_AUDITORIA_FACTURACION]: { ...baseStyles.view, descripcion: 'Auditoría (Fact.)' },
    [Permiso.EDITAR_ELIMINAR_ANEXO_FACTURACION]: { ...baseStyles.delete, descripcion: 'Eliminar Anexo (Fact.)' },
    [Permiso.VER_REPORTES_AVANZADOS_FACTURACION]: { ...baseStyles.special, descripcion: 'Reportes Avanzados (Fact.)' },
    // Operaciones
    [Permiso.ANEXAR_DOCUMENTO_OPERACIONES]: { ...baseStyles.add, descripcion: 'Anexar (Op.)' },
    [Permiso.ACCESO_SEGUIMIENTO_OPERACIONES]: { ...baseStyles.view, descripcion: 'Tracking (Op.)' },
    [Permiso.ACCESO_BUSQUEDA_OPERACIONES]: { ...baseStyles.view, descripcion: 'Búsqueda (Op.)' },
    [Permiso.ACCESO_REPORTES_OPERACIONES]: { ...baseStyles.view, descripcion: 'Reportes (Op.)' },
    [Permiso.ACCESO_AUDITORIA_OPERACIONES]: { ...baseStyles.view, descripcion: 'Auditoría (Op.)' },
    [Permiso.EDITAR_ELIMINAR_ANEXO_OPERACIONES]: { ...baseStyles.delete, descripcion: 'Eliminar Anexo (Op.)' },
    [Permiso.VER_REPORTES_AVANZADOS_OPERACIONES]: { ...baseStyles.special, descripcion: 'Reportes Avanzados (Op.)' },
    [Permiso.ACTUALIZAR_ESTADO_ENTREGA_OPERACIONES]: { ...baseStyles.edit, descripcion: 'Actualizar Entrega (Op.)' },
};

const PermissionIcon: React.FC<PermissionIconProps> = ({ permiso }) => {
  const estilo = estilosPermiso[permiso];

  if (!estilo) return null;

  return (
    <span className={`inline-flex items-center gap-x-1.5 py-1 px-2.5 rounded-full text-xs font-medium ${estilo.clases}`} title={estilo.descripcion}>
      {estilo.icono}
      <span className="hidden sm:inline">{estilo.descripcion}</span>
    </span>
  );
};

export default PermissionIcon;
