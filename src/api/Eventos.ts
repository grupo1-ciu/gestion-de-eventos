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
    const response = await eventosApi.post(EVENTOS_URL, evento, {
        withCredentials: true,
    });
    console.log(response.data);
    return response.data;
};

export const buscarEvento = async (id: string) => {
    const response = await eventosApi.get(EVENTOS_URL+'/'+ id);

    return response;
}