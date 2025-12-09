
import { Rol, Permiso } from '../types';

// Simulación de la base de datos para el servicio de Roles
export let rolesDB: Rol[] = [
  { 
    id: 1, 
    nombre: 'Administrador del Sistema', 
    permisos: Object.values(Permiso), // Admin tiene todos los permisos
  },
  { 
    id: 2, 
    nombre: 'Supervisor de Área', 
    permisos: [
        Permiso.VER_TODOS_LOS_DOCUMENTOS,
        Permiso.ACCESO_SEGUIMIENTO_COMPRAS, Permiso.ACCESO_BUSQUEDA_COMPRAS, Permiso.ACCESO_REPORTES_COMPRAS, Permiso.ACCESO_AUDITORIA_COMPRAS,
        Permiso.ANEXAR_DOCUMENTO_COMPRAS, Permiso.EDITAR_ELIMINAR_ANEXO_COMPRAS, Permiso.VER_REPORTES_AVANZADOS_COMPRAS,
        Permiso.ACCESO_SEGUIMIENTO_FACTURACION, Permiso.ACCESO_BUSQUEDA_FACTURACION, Permiso.ACCESO_REPORTES_FACTURACION, Permiso.ACCESO_AUDITORIA_FACTURACION,
        Permiso.ANEXAR_DOCUMENTO_FACTURACION, Permiso.EDITAR_ELIMINAR_ANEXO_FACTURACION, Permiso.VER_REPORTES_AVANZADOS_FACTURACION,
        Permiso.ACCESO_SEGUIMIENTO_OPERACIONES, Permiso.ACCESO_BUSQUEDA_OPERACIONES, Permiso.ACCESO_REPORTES_OPERACIONES, Permiso.ACCESO_AUDITORIA_OPERACIONES,
        Permiso.ANEXAR_DOCUMENTO_OPERACIONES, Permiso.EDITAR_ELIMINAR_ANEXO_OPERACIONES, Permiso.VER_REPORTES_AVANZADOS_OPERACIONES, Permiso.ACTUALIZAR_ESTADO_ENTREGA_OPERACIONES,
    ]
  },
  { 
    id: 3, 
    nombre: 'Asistente de Área', 
    permisos: [
        Permiso.ACCESO_SEGUIMIENTO_COMPRAS, Permiso.ACCESO_BUSQUEDA_COMPRAS,
        Permiso.ANEXAR_DOCUMENTO_COMPRAS,
        Permiso.ACCESO_SEGUIMIENTO_FACTURACION, Permiso.ACCESO_BUSQUEDA_FACTURACION,
        Permiso.ANEXAR_DOCUMENTO_FACTURACION,
        Permiso.ACCESO_SEGUIMIENTO_OPERACIONES, Permiso.ACCESO_BUSQUEDA_OPERACIONES,
        Permiso.ANEXAR_DOCUMENTO_OPERACIONES,
    ]
  },
   { 
    id: 4, 
    nombre: 'Supervisor de Ventas', 
    permisos: [
        Permiso.VER_TODOS_LOS_DOCUMENTOS,
        Permiso.ACCESO_SEGUIMIENTO_VENTAS, Permiso.ACCESO_BUSQUEDA_VENTAS, Permiso.ACCESO_REPORTES_VENTAS, Permiso.ACCESO_AUDITORIA_VENTAS,
        Permiso.REGISTRAR_DOCUMENTO_VENTAS, Permiso.ELIMINAR_OC_VENTAS, Permiso.VER_REPORTES_AVANZADOS_VENTAS,
    ]
  },
  { 
    id: 5, 
    nombre: 'Asistente de Ventas', 
    permisos: [
        Permiso.ACCESO_SEGUIMIENTO_VENTAS, Permiso.ACCESO_BUSQUEDA_VENTAS,
        Permiso.REGISTRAR_DOCUMENTO_VENTAS,
    ]
  },
];
