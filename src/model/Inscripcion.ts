import { EstadoInscripcion } from "./EstadoInscripcion";
import { Evento } from "./Evento";
import { Usuario } from "./Usuario";

export type Inscripcion = {
    id: string;
    estadoInscripcion: EstadoInscripcion;
    evento: Evento;
    usuario: Usuario;
}