import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import './InscripcionesCancelarButton.css';

type InscripcionesCancelarButtonProps = {
    idInscripcion: string;
}

export const InscripcionesCancelarButton: React.FC<InscripcionesCancelarButtonProps> = ({idInscripcion}) => {

    // const handleCancel = async (idEvento) => {
    //     const response = await cancelarInscripcion(idEvento, "CANCELADA");
    //     return response;
    // }

    return(
        <button 
            type="button" 
            className="btn btn-danger"
            title="Cancelar"
            // onClick={handleCancel(idEvento)}
        >
            <FontAwesomeIcon icon={faTrashCan}/>
        </button>
    )
}