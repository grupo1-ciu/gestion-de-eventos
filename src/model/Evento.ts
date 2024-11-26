export type TipoEvento = {
    nombre: string
}


export type Evento = {
    id: string;
    descripcion: string;
    sala: string;
    capacidad: number;
    horaInicio: string;
    fechaEvento: string;
    tipoEvento: TipoEvento;
}
