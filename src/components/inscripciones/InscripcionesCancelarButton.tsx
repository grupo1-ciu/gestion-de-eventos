import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import './InscripcionesCancelarButton.css';

type InscripcionesCancelarButtonProps = {
    idInscripcion: string;
    onCancel: ((idInscripcion: string) => void);
}

export const InscripcionesCancelarButton: React.FC<InscripcionesCancelarButtonProps> = ({idInscripcion, onCancel}) => {

    const handleCancel = async (idInscripcion: string) => {
        onCancel(idInscripcion);
    }

    return(
        <button 
            type="button"
            className="btn btn-danger"
            title="Cancelar"
            onClick={() => handleCancel(idInscripcion)}
        >
            <FontAwesomeIcon icon={faTrashCan}/>
        </button>
    )
}