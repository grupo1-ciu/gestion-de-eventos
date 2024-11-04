import eventosApi from "./EventosApi";

const REGISTRO_URL = '/auth/usuarios';

export const registro = async (nombre: string, apellido:string, email:string, password:string) => {
    const repsonse = await eventosApi.post(REGISTRO_URL,
        JSON.stringify({nombre, apellido, email, password}),
        {
            withCredentials: true
        }
    );
    return repsonse;
}