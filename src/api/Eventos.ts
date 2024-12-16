import eventosApi  from "./EventosApi";
import { Evento } from "../model/Evento";

const EVENTOS_URL = '/eventos';

export const listarEventos = async () => {
    const response = await eventosApi.get(EVENTOS_URL,
        {
            withCredentials: true,
        });

    console.log(response.data);
    return response.data;
}

export const crearEventos = async (evento: Evento): Promise<Evento> => {
    const CREAR_EVENTO_URL = '/eventos/crearEvento';
    const response = await eventosApi.post(CREAR_EVENTO_URL, evento, {
        withCredentials: true,
    });
    console.log(response.data);
    return response.data;
};

export const editarEvento = async (id: string, evento: Evento): Promise<Evento> => {
    const EDITAR_EVENTO_URL = `/eventos/${id}`;
    const response = await eventosApi.put(EDITAR_EVENTO_URL, evento, {
        withCredentials: true,
    });
    console.log(response.data);
    return response.data;
};

export const buscarEvento = async (id: string) => {
    const response = await eventosApi.get(EVENTOS_URL+'/'+ id);

    return response;
}