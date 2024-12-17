import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import './LocacionBotonCancelar.css'

type LocacionBotonCancelarProps= {
    idLocacion: string;
    onCancel: ((idLocacion: string) => void);
}

export const LocacionBotonCancelar: React.FC<LocacionBotonCancelarProps> = ({idLocacion, onCancel}) => {

    const handleCancel = async (idLocacion: string) => {
        onCancel(idLocacion);
    }

    return(
        <button 
            type="button"
            className="btn btn-danger"
            title="Cancelar"
            onClick={() => handleCancel(idLocacion)}
        >
            <FontAwesomeIcon icon={faTrashCan}/>
        </button>
    )
}