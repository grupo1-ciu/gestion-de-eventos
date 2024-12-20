import axios from 'axios';
import { Locacion } from '../model/Locacion';
import eventosApi from './EventosApi';

const BASE_URL = 'http://localhost:8080/eventostp/locaciones';

const getToken = (): string | null => {
  const userString = sessionStorage.getItem('user');
  if (!userString) {
    console.error("No se encontro la informacion del usuario en sessionStorage.");
    return null;
  }

  try {
    const user = JSON.parse(userString); 
    return user.token; 
  } catch (error) {
    console.error("Error al parsear la informacion del usuario:", error);
    return null;
  }
};

const obtenerConfiguracion = (): object => {
  const token = getToken();
  if (!token) {
    console.error("No se encontro un token de autenticacion.");
    throw new Error("Token no encontrado");
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
    console.error('Error al crear locacion:', error);
    throw error;
  }
};
/*no se como hacerlo sin las promises, intente pero se rompia todo y queria llegae*/
export const eliminarLocacion = async (idLocacion: string): Promise<void> => {
  const config = obtenerConfiguracion();
  try {
    await axios.delete(`${BASE_URL}/${idLocacion}`, config);
    console.log(`Locación con ID ${idLocacion} eliminada.`);
  } catch (error) {
    console.error(`Error al eliminar la locacion con ID ${idLocacion}:`, error);
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
    console.error('Error al obtener locacion:', error);
    throw error;
  }
};

export const buscarLocaciones = async (nombre: string, capacity?: number | undefined): Promise<Locacion[]> => {
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
      throw new Error('La respuesta de la API no es valida');
    }
  } catch (error) {
    console.error(`Error al actualizar la locación con ID ${idLocacion}:`, error);
    throw error;
  }
};