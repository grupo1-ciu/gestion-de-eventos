import eventosApi from "./EventosApi";

const INSCRIPCIONES_URL = "/inscripciones";

export const listarInscripcionesPorEmail = async (email: string) => {
  const URL = INSCRIPCIONES_URL+'/'+email;

  const response = await eventosApi.get(URL, {
    withCredentials: true,
  });

  return response.data;
};

export const cancelarInscripcion = async (idInscripcion: string) => {
  

  const inscripcion = {
    id : idInscripcion,
    estadoInscripcion : {
      estado : 'CANCELADA'
    },
  };

  const response = await eventosApi.put(INSCRIPCIONES_URL, inscripcion);

  return response;
}

export const inscribirUsuarioAEvento = async (idEvento: string, emailUsuario: string) => {
  const inscripcion = {
    idEvento,
    emailUsuario
  }
  const response = await eventosApi.post(INSCRIPCIONES_URL, inscripcion);

  return response;
}