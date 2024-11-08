import React from "react"
import { Inscripcion } from "../../model/Inscripcion"

type inscripcionRowProps = {
    inscripcion: Inscripcion
}

export const InscripcionRow: React.FC<inscripcionRowProps> = ({inscripcion}) => {
    return(
        <>
            <tr>
                <td>{inscripcion.evento.descripcion}</td>
                <td>{inscripcion.evento.sala}</td>
                <td>{inscripcion.evento.fechaEvento}</td>
                <td>{inscripcion.evento.horaInicio}</td>
                <td>{inscripcion.estadoInscripcion.estado}</td>
            </tr>
        </>
    )
}