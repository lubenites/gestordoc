

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Documento, Area, EstadoEntrega, ArchivoInfo } from '../types';
import { servicioDocumentos } from '../api/documentService';
import { servicioAlmacenamiento } from '../api/storageService';
import { useAuth } from './AuthContext';

interface DocumentContextType {
  documentos: Documento[];
  cargando: boolean;
  error: string | null;
  agregarDocumento: (oc: string, archivoPrincipal: File) => Promise<void>;
  eliminarDocumento: (docId: number) => Promise<void>;
  anexarArchivoParaArea: (oc: string, area: Area.COMPRAS | Area.FACTURACION | Area.OPERACIONES, archivo: File) => Promise<void>;
  agregarVersionAnexo: (oc: string, area: Area.COMPRAS | Area.FACTURACION | Area.OPERACIONES, archivo: File) => Promise<void>;
  eliminarAnexo: (oc: string, area: Area.COMPRAS | Area.FACTURACION | Area.OPERACIONES, archivoAEliminar: ArchivoInfo) => Promise<void>;
  actualizarEstadoEntrega: (oc: string, estado: EstadoEntrega) => Promise<void>;
  obtenerArchivoPorId: (id: string) => Promise<File | null>;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { usuario } = useAuth();
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const obtenerDocumentos = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const docs = await servicioDocumentos.obtenerDocumentos();
      setDocumentos(docs);
    } catch (e) {
      setError('Falló la obtención de documentos.');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    if (usuario) {
        obtenerDocumentos();
    } else {
        setDocumentos([]);
    }
  }, [usuario, obtenerDocumentos]);

  const agregarDocumento = async (oc: string, archivoPrincipal: File) => {
    if (!usuario) return;
    const archivoInfo = await servicioAlmacenamiento.uploadFile(archivoPrincipal);
    const nuevoDoc = await servicioDocumentos.crearDocumento(oc, archivoInfo, { id: usuario.id });
    setDocumentos(prev => [...prev, nuevoDoc]);
  };

  const eliminarDocumento = async (docId: number) => {
    // En una app real, aquí se obtendrían los IDs de los archivos del doc
    // y se llamarían a servicioAlmacenamiento.deleteFile para cada uno.
    const exito = await servicioDocumentos.eliminarDocumento(docId);
    if (exito) {
      setDocumentos(prev => prev.filter(d => d.id !== docId));
    }
  };

  const anexarArchivoParaArea = async (oc: string, area: Area.COMPRAS | Area.FACTURACION | Area.OPERACIONES, archivo: File) => {
    if (!usuario) return;
    const archivoInfo = await servicioAlmacenamiento.uploadFile(archivo);
    const docActualizado = await servicioDocumentos.agregarAnexo(oc, area, archivoInfo, { id: usuario.id }, false);
    if (docActualizado) {
      setDocumentos(prev => prev.map(d => d.id === docActualizado.id ? docActualizado : d));
    }
  };
  
  const agregarVersionAnexo = async (oc: string, area: Area.COMPRAS | Area.FACTURACION | Area.OPERACIONES, archivo: File) => {
    if (!usuario) return;
    const archivoInfo = await servicioAlmacenamiento.uploadFile(archivo);
    const docActualizado = await servicioDocumentos.agregarAnexo(oc, area, archivoInfo, { id: usuario.id }, true);
    if (docActualizado) {
      setDocumentos(prev => prev.map(d => d.id === docActualizado.id ? docActualizado : d));
    }
  };
  
  const eliminarAnexo = async (oc: string, area: Area.COMPRAS | Area.FACTURACION | Area.OPERACIONES, archivoAEliminar: ArchivoInfo) => {
    if (!usuario) return;
    await servicioAlmacenamiento.deleteFile(archivoAEliminar.id);
    const docActualizado = await servicioDocumentos.eliminarAnexo(oc, area, archivoAEliminar, { id: usuario.id });
    if (docActualizado) {
      setDocumentos(prev => prev.map(d => d.id === docActualizado.id ? docActualizado : d));
    }
  };
  
  const actualizarEstadoEntrega = async (oc: string, estado: EstadoEntrega) => {
    if (!usuario) return;
    const docActualizado = await servicioDocumentos.actualizarEstadoEntrega(oc, estado, { id: usuario.id });
     if (docActualizado) {
      setDocumentos(prev => prev.map(d => d.id === docActualizado.id ? docActualizado : d));
    }
  };

  const obtenerArchivoPorId = async (id: string): Promise<File | null> => {
    return servicioAlmacenamiento.getFile(id);
  }

  return (
    <DocumentContext.Provider value={{ documentos, cargando, error, agregarDocumento, eliminarDocumento, anexarArchivoParaArea, agregarVersionAnexo, eliminarAnexo, actualizarEstadoEntrega, obtenerArchivoPorId }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocumentos = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocumentos debe ser utilizado dentro de un DocumentProvider');
  }
  return context;
};