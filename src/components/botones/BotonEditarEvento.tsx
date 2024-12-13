import React from "react"
import { Link } from "react-router-dom"
import { Evento } from "../../model/Evento"

export const BotonEditar = ({}) => {
    return(
        <>
        <Link to={/vehiculo/${}/editar}>
            <button className="edit-button" data-tooltip="Editar">
                <i className="bi bi-pencil-square"></i>
            </button>
        </Link>
        </>
        
    )
}