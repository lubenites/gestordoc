
import { Area, Permiso } from './types';

export const TODAS_LAS_AREAS: Area[] = [
    Area.VENTAS,
    Area.COMPRAS,
    Area.FACTURACION,
    Area.OPERACIONES,
    Area.ADMIN,
];

export const ETAPAS_FLUJO: Area[] = [
    Area.VENTAS,
    Area.COMPRAS,
    Area.FACTURACION,
    Area.OPERACIONES,
];

export const ESTRUCTURA_PERMISOS: {
    grupo: string;
    permisos: { permiso: Permiso; descripcion: string }[];
}[] = [
    {
        grupo: 'Administración',
        permisos: [
            { permiso: Permiso.VER_TODOS_LOS_DOCUMENTOS, descripcion: 'Ver documentos de todos' },
            { permiso: Permiso.GESTIONAR_USUARIOS, descripcion: 'Gestionar usuarios' },
            { permiso: Permiso.GESTIONAR_ROLES, descripcion: 'Gestionar roles y permisos' },
        ]
    },
    {
        grupo: 'Ventas',
        permisos: [
            { permiso: Permiso.REGISTRAR_DOCUMENTO_VENTAS, descripcion: 'Registrar documento' },
            { permiso: Permiso.ACCESO_SEGUIMIENTO_VENTAS, descripcion: 'Acceso a Tracking' },
            { permiso: Permiso.ACCESO_BUSQUEDA_VENTAS, descripcion: 'Acceso a Búsqueda' },
            { permiso: Permiso.ACCESO_REPORTES_VENTAS, descripcion: 'Acceso a Reportería' },
            { permiso: Permiso.ACCESO_AUDITORIA_VENTAS, descripcion: 'Acceso a Auditoría' },
            { permiso: Permiso.ELIMINAR_OC_VENTAS, descripcion: 'Editar/Eliminar OC' },
            { permiso: Permiso.VER_REPORTES_AVANZADOS_VENTAS, descripcion: 'Ver reportes avanzados' },
        ]
    },
    {
        grupo: 'Compras',
        permisos: [
            { permiso: Permiso.ANEXAR_DOCUMENTO_COMPRAS, descripcion: 'Anexar documento' },
            { permiso: Permiso.ACCESO_SEGUIMIENTO_COMPRAS, descripcion: 'Acceso a Tracking' },
            { permiso: Permiso.ACCESO_BUSQUEDA_COMPRAS, descripcion: 'Acceso a Búsqueda' },
            { permiso: Permiso.ACCESO_REPORTES_COMPRAS, descripcion: 'Acceso a Reportería' },
            { permiso: Permiso.ACCESO_AUDITORIA_COMPRAS, descripcion: 'Acceso a Auditoría' },
            { permiso: Permiso.EDITAR_ELIMINAR_ANEXO_COMPRAS, descripcion: 'Editar/Eliminar anexo' },
            { permiso: Permiso.VER_REPORTES_AVANZADOS_COMPRAS, descripcion: 'Ver reportes avanzados' },
        ]
    },
    {
        grupo: 'Facturación',
        permisos: [
            { permiso: Permiso.ANEXAR_DOCUMENTO_FACTURACION, descripcion: 'Anexar documento' },
            { permiso: Permiso.ACCESO_SEGUIMIENTO_FACTURACION, descripcion: 'Acceso a Tracking' },
            { permiso: Permiso.ACCESO_BUSQUEDA_FACTURACION, descripcion: 'Acceso a Búsqueda' },
            { permiso: Permiso.ACCESO_REPORTES_FACTURACION, descripcion: 'Acceso a Reportería' },
            { permiso: Permiso.ACCESO_AUDITORIA_FACTURACION, descripcion: 'Acceso a Auditoría' },
            { permiso: Permiso.EDITAR_ELIMINAR_ANEXO_FACTURACION, descripcion: 'Editar/Eliminar anexo' },
            { permiso: Permiso.VER_REPORTES_AVANZADOS_FACTURACION, descripcion: 'Ver reportes avanzados' },
        ]
    },
    {
        grupo: 'Operaciones',
        permisos: [
            { permiso: Permiso.ANEXAR_DOCUMENTO_OPERACIONES, descripcion: 'Anexar documento' },
            { permiso: Permiso.ACCESO_SEGUIMIENTO_OPERACIONES, descripcion: 'Acceso a Tracking' },
            { permiso: Permiso.ACCESO_BUSQUEDA_OPERACIONES, descripcion: 'Acceso a Búsqueda' },
            { permiso: Permiso.ACCESO_REPORTES_OPERACIONES, descripcion: 'Acceso a Reportería' },
            { permiso: Permiso.ACCESO_AUDITORIA_OPERACIONES, descripcion: 'Acceso a Auditoría' },
            { permiso: Permiso.EDITAR_ELIMINAR_ANEXO_OPERACIONES, descripcion: 'Editar/Eliminar anexo' },
            { permiso: Permiso.VER_REPORTES_AVANZADOS_OPERACIONES, descripcion: 'Ver reportes avanzados' },
            { permiso: Permiso.ACTUALIZAR_ESTADO_ENTREGA_OPERACIONES, descripcion: 'Actualizar estado de entrega' },
        ]
    }
];
