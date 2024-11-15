import eventosApi from "./EventosApi";

export const listarInscripcionesPorEmail = async (email: string) => {
  const INSCRIPCIONES_URL = "/inscripciones/" + email;

  const response = await eventosApi.get(INSCRIPCIONES_URL, {
    withCredentials: true,
  });

  return response.data;
};

export const cancelarInscripcion = async (idInscripcion: string) => {
  const INSCRIPCIONES_URL = "/inscripciones";

  const inscripcion = {
    id : idInscripcion,
    estadoInscripcion : {
      estado : 'CANCELADA'
    },
  };

  const response = await eventosApi.put(INSCRIPCIONES_URL, inscripcion);

  return response;
}
