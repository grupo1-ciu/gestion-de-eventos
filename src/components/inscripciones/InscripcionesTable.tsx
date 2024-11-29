import { Inscripcion } from "../../model/Inscripcion"
import { InscripcionRow } from "./InscripcionRow"

type inscripcionesListProps = {
    inscripciones: Inscripcion[];
    onCancel : ((idInscripcion:string) => void)
}

export const InscripcionesTable: React.FC<inscripcionesListProps> = ({inscripciones, onCancel}) => {
    return(
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Evento</th>
                    <th scope="col">Sala</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Estado</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                {
                    inscripciones.map( (inscripcion: Inscripcion) => (
                        <InscripcionRow key={inscripcion.id} inscripcion={inscripcion} onCancel={onCancel}/>
                    ))
                }
                </tbody>
            </table>
            
        </>
    )
}