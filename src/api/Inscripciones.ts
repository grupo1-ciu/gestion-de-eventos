import eventosApi from "./EventosApi";

export const listarInscripciones = async () => {
    const INSCRIPCIONES_URL = '/inscripciones';
    const response = await eventosApi.post(INSCRIPCIONES_URL);
    console.log(response.data);
    return response;
}