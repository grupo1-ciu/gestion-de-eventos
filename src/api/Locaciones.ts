import axios from 'axios';
import { Locacion } from '../model/Locacion';
import eventosApi from './EventosApi';

const BASE_URL = 'http://localhost:8080/eventostp/locaciones';

const getToken = (): string | null => {
  const userString = sessionStorage.getItem('user');
  if (!userString) {
    console.error("No se encontró la información del usuario en sessionStorage.");
    return null;
  }

  try {
    const user = JSON.parse(userString); 
    return user.token; 
  } catch (error) {
    console.error("Error al parsear la información del usuario:", error);
    return null;
  }
};

const obtenerConfiguracion = (): object => {
  const token = getToken();
  if (!token) {
    console.error("No se encontró un token de autenticación.");
    throw new Error("Token not found");
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const realizarPeticion = async <T>(url: string, config: object = {}): Promise<T> => {
  try {
    const respuesta = await axios.get(url, config);
    return respuesta.data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const crearLocacion = async (locacionData: any) => {
  try {
    const response = await eventosApi.post('/locaciones/crear', locacionData);
    return response.data;
  } catch (error) {
    console.error('Error al crear locación:', error);
    throw error;
  }
};

export const eliminarLocacion = async (idLocacion: string): Promise<void> => {
  const config = obtenerConfiguracion();
  try {
    await axios.delete(`${BASE_URL}/${idLocacion}`, config);
    console.log(`Locación con ID ${idLocacion} eliminada.`);
  } catch (error) {
    console.error(`Error al eliminar la locación con ID ${idLocacion}:`, error);
    throw error;
  }
};

export const obtenerLocaciones = async (pagina: number, tamaño: number): Promise<Locacion[]> => {
  const config = obtenerConfiguracion();
  return realizarPeticion<Locacion[]>(`${BASE_URL}?page=${pagina}&size=${tamaño}`, config);
};

export const obtenerLocacion = async (idLocacion: string): Promise<Locacion> => {
  try {
    const response = await axios.get(`${BASE_URL}/${idLocacion}`, obtenerConfiguracion());
    if (response.headers['content-type'].includes('application/json')) {
      return response.data;
    } else {
      throw new Error('La respuesta no es JSON');
    }
  } catch (error) {
    console.error('Error al obtener locación:', error);
    throw error;
  }
};

export const buscarLocaciones = async (nombre: string): Promise<Locacion[]> => {
  const config = obtenerConfiguracion();
  return realizarPeticion<Locacion[]>(`${BASE_URL}/buscar?nombre=${encodeURIComponent(nombre)}`, config);
};

export const filtrarLocaciones = async (capacidad: number): Promise<Locacion[]> => {
  const config = obtenerConfiguracion();
  return realizarPeticion<Locacion[]>(`${BASE_URL}/filtrar?capacidadMaxima=${encodeURIComponent(capacidad)}`, config);
};

export const actualizarLocacion = async (idLocacion: string, locacion: { id: string; nombre: string; direccion: string; capacidadMaxima: number; tieneEstacionamiento: boolean; }): Promise<Locacion> => {
  const config = obtenerConfiguracion();
  try {
    const response = await axios.put(`${BASE_URL}/${idLocacion}`, locacion, config);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('La respuesta de la API no es válida');
    }
  } catch (error) {
    console.error(`Error al actualizar la locación con ID ${idLocacion}:`, error);
    throw error;
  }
};
