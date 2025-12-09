
import { Usuario } from '../types';

// Simulación de la base de datos para el servicio de Usuarios y Autenticación
// Se ha eliminado 'area' y se usa solo 'rolId'
export let usuariosDB: Usuario[] = [
  { id: 1, nombres: 'Admin', apellidos: 'Sadda', email: 'admin@gruposadda.com', password: '123', rolId: 1 },
  { id: 2, nombres: 'Juan', apellidos: 'Pérez', email: 'juan.perez@example.com', password: '123', rolId: 2 },
  { id: 3, nombres: 'María', apellidos: 'Rodríguez', email: 'maria.r@example.com', password: '123', rolId: 5 },
  { id: 4, nombres: 'Carlos', apellidos: 'López', email: 'carlos.lopez@example.com', password: '123', rolId: 3 },
  { id: 5, nombres: 'Ana', apellidos: 'Gomez', email: 'ana.gomez@example.com', password: '123', rolId: 4 },
];
