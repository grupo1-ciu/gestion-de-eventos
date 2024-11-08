import eventosApi from "./EventosApi";

export const listarInscripcionesPorEmail = async (email: string) => {
  const INSCRIPCIONES_URL = "/inscripciones/" + email;

  const response = await eventosApi.get(INSCRIPCIONES_URL, {
    withCredentials: true,
  });

  console.log(response.data);
  return response.data;
};
