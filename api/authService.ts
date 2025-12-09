
import { usuariosDB } from './db_usuarios';
import { rolesDB } from './db_roles';
import { Usuario, Permiso } from '../types';

const RETRASO_SIMULADO = 500;

export const servicioAuth = {
  iniciarSesion: (email: string, password: string): Promise<(Usuario & { permisos: Permiso[] }) | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const usuario = usuariosDB.find(u => u.email === email && u.password === password);
        if (usuario) {
          const rol = rolesDB.find(r => r.id === usuario.rolId);
          const permisos = rol ? rol.permisos : [];
          
          const { password, ...usuarioSinPassword } = usuario;
          resolve({ ...usuarioSinPassword, permisos } as (Usuario & { permisos: Permiso[] }));
        } else {
          resolve(null);
        }
      }, RETRASO_SIMULADO);
    });
  },
};
