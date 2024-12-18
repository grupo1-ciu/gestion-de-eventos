import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from 'react-router-dom';
import './LocacionBotonActualizar.css';

/*Entiendo que podria hacer un boton generico y aca meter solo la logica pero no*/

type LocacionBotonActualizarProps = {
    idLocacion: string;
    onEdit: ((idLocacion: string) => void);
}

export const LocacionBotonActualizar: React.FC<LocacionBotonActualizarProps> = ({ idLocacion, onEdit }) => {
    const navigate = useNavigate();

    const handleEdit = async (idLocacion: string) => {
        onEdit(idLocacion);
        navigate(`/locaciones/editar/${idLocacion}`);
      };
      

    return (
        <button 
            type="button"
            className="btn btn-warning"
            title="Editar"
            onClick={() => handleEdit(idLocacion)}
        >
            <FontAwesomeIcon icon={faEdit}/>
        </button>
    );
}
