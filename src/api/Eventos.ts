import eventosApi  from "./EventosApi";

export const listarEventos = async () => {
    const EVENTOS_URL = '/eventos';

    const response = await eventosApi.get(EVENTOS_URL,
        {
            withCredentials: true,
        });
    return response.data;
}