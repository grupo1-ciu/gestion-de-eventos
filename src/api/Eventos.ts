import eventosApi  from "./EventosApi";

const EVENTOS_URL = '/eventos';

export const listarEventos = async () => {
    const response = await eventosApi.get(EVENTOS_URL,
        {
            withCredentials: true,
        });

    console.log(response.data);
    return response.data;
}

export const buscarEvento = async (id: string) => {
    const response = await eventosApi.get(EVENTOS_URL+'/'+ id);

    return response;
}