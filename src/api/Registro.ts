import eventosApi from "./EventosApi";

const REGISTRO_URL = '/auth/usuarios';

// TODO: Refactorizar para recibir un objeto directamente en vez de los atributos por separado
export const registro = async (nombre: string, apellido:string, email:string, password:string) => {
    const repsonse = await eventosApi.post(REGISTRO_URL,
        //TODO: Cambiar para una vez que reciba el objeto, pasar estos attributos con spread.
        JSON.stringify({nombre, apellido, email, password}),
        {
            withCredentials: true
        }
    );
    return repsonse;
}