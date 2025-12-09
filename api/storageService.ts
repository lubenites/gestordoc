import { ArchivoInfo } from '../types';

// Simulación de almacenamiento en memoria para los objetos File
const fileStorage = new Map<string, File>();

// Simulación de la base de datos de metadatos de archivos (lo que un servicio real expondría)
const fileMetadataDB: ArchivoInfo[] = [];

const RETRASO_SIMULADO = 200;

export const servicioAlmacenamiento = {
  uploadFile: (file: File): Promise<ArchivoInfo> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const fileId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        const newFileInfo: ArchivoInfo = {
          id: fileId,
          nombre: file.name,
        };
        
        fileStorage.set(fileId, file);
        fileMetadataDB.push(newFileInfo);
        
        resolve(newFileInfo);
      }, RETRASO_SIMULADO);
    });
  },

  getFile: (id: string): Promise<File | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const file = fileStorage.get(id);
            resolve(file || null);
        }, RETRASO_SIMULADO);
    });
  },

  deleteFile: (id: string): Promise<boolean> => {
      return new Promise((resolve) => {
          setTimeout(() => {
              const deleted = fileStorage.delete(id);
              const metadataIndex = fileMetadataDB.findIndex(f => f.id === id);
              if (metadataIndex > -1) {
                  fileMetadataDB.splice(metadataIndex, 1);
              }
              resolve(deleted);
          }, RETRASO_SIMULADO);
      });
  }
};
