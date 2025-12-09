

export enum Permiso {
  // Administración Global
  GESTIONAR_USUARIOS = 'gestionar-usuarios',
  GESTIONAR_ROLES = 'gestionar-roles',
  VER_TODOS_LOS_DOCUMENTOS = 'ver-todos-los-documentos',

  // Permisos de Ventas
  REGISTRAR_DOCUMENTO_VENTAS = 'registrar-documento-ventas',
  ACCESO_SEGUIMIENTO_VENTAS = 'acceso-seguimiento-ventas',
  ACCESO_BUSQUEDA_VENTAS = 'acceso-busqueda-ventas',
  ACCESO_REPORTES_VENTAS = 'acceso-reportes-ventas',
  ACCESO_AUDITORIA_VENTAS = 'acceso-auditoria-ventas',
  ELIMINAR_OC_VENTAS = 'eliminar-oc-ventas',
  VER_REPORTES_AVANZADOS_VENTAS = 'ver-reportes-avanzados-ventas',

  // Permisos de Compras
  ANEXAR_DOCUMENTO_COMPRAS = 'anexar-documento-compras',
  ACCESO_SEGUIMIENTO_COMPRAS = 'acceso-seguimiento-compras',
  ACCESO_BUSQUEDA_COMPRAS = 'acceso-busqueda-compras',
  ACCESO_REPORTES_COMPRAS = 'acceso-reportes-compras',
  ACCESO_AUDITORIA_COMPRAS = 'acceso-auditoria-compras',
  EDITAR_ELIMINAR_ANEXO_COMPRAS = 'editar-eliminar-anexo-compras',
  VER_REPORTES_AVANZADOS_COMPRAS = 'ver-reportes-avanzados-compras',

  // Permisos de Facturación
  ANEXAR_DOCUMENTO_FACTURACION = 'anexar-documento-facturacion',
  ACCESO_SEGUIMIENTO_FACTURACION = 'acceso-seguimiento-facturacion',
  ACCESO_BUSQUEDA_FACTURACION = 'acceso-busqueda-facturacion',
  ACCESO_REPORTES_FACTURACION = 'acceso-reportes-facturacion',
  ACCESO_AUDITORIA_FACTURACION = 'acceso-auditoria-facturacion',
  EDITAR_ELIMINAR_ANEXO_FACTURACION = 'editar-eliminar-anexo-facturacion',
  VER_REPORTES_AVANZADOS_FACTURACION = 'ver-reportes-avanzados-facturacion',

  // Permisos de Operaciones
  ANEXAR_DOCUMENTO_OPERACIONES = 'anexar-documento-operaciones',
  ACCESO_SEGUIMIENTO_OPERACIONES = 'acceso-seguimiento-operaciones',
  ACCESO_BUSQUEDA_OPERACIONES = 'acceso-busqueda-operaciones',
  ACCESO_REPORTES_OPERACIONES = 'acceso-reportes-operaciones',
  ACCESO_AUDITORIA_OPERACIONES = 'acceso-auditoria-operaciones',
  EDITAR_ELIMINAR_ANEXO_OPERACIONES = 'editar-eliminar-anexo-operaciones',
  VER_REPORTES_AVANZADOS_OPERACIONES = 'ver-reportes-avanzados-operaciones',
  ACTUALIZAR_ESTADO_ENTREGA_OPERACIONES = 'actualizar-estado-entrega-operaciones',
}


export enum EstadoEntrega {
  EN_ESPERA = 'En Espera',
  EN_RUTA = 'En Ruta',
  ENTREGADO = 'Entregado',
}

export interface Rol {
  id: number;
  nombre: string;
  permisos: Permiso[];
}

export interface Usuario {
  id: number;
  nombres: string;
  apellidos: string;
  email: string;
  rolId: number;
  password?: string;
  permisos?: Permiso[]; // Added dynamically on login
}

export interface RegistroAuditoria {
  timestamp: string; // ISO String
  usuarioId: number;
  area: Area;
  accion: string;
  nombreArchivo: string;
}

export interface ArchivoInfo {
  id: string;
  nombre: string;
}

export interface Documento {
  id: number;
  oc: string;
  archivoPrincipal: ArchivoInfo;
  fechaCreacion: string; // ISO String
  creadoPor: number; // usuarioId
  estado: EstadoDocumento;
  estadoEntrega?: EstadoEntrega;
  anexos: {
    [Area.COMPRAS]: ArchivoInfo[];
    [Area.FACTURACION]: ArchivoInfo[];
    [Area.OPERACIONES]: ArchivoInfo[];
  };
  historial: RegistroAuditoria[];
}

export type Vista = 'registrar' | 'anexar' | 'usuarios' | 'roles' | 'seguimiento' | 'busqueda' | 'reportes' | 'auditoria';

export enum Area {
  VENTAS = 'ventas',
  COMPRAS = 'compras',
  FACTURACION = 'facturacion',
  OPERACIONES = 'operaciones',
  ADMIN = 'admin',
}

export enum EstadoDocumento {
  PENDIENTE_COMPRAS = 'Pendiente Compras',
  PENDIENTE_FACTURACION = 'Pendiente Facturación',
  PENDIENTE_OPERACIONES = 'Pendiente Operaciones',
  COMPLETADO = 'Completado',
}