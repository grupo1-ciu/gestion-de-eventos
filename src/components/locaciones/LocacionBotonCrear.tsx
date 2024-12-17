import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from 'react-router-dom';
import './LocacionBotonCrear.css';

type LocacionBotonCrearProps = {
    titulo: string;
    className: string; 
}

export const LocacionBotonCrear: React.FC<LocacionBotonCrearProps> = ({ titulo= "Crear", className= "btn-crear" }) => {
    const navigate = useNavigate();

    const handleCrear = () => {
        navigate('/locaciones/crear');
    };

    return (
        <button 
            type="button"
            className={`btn ${className}`} 
            title={titulo}
            onClick={handleCrear}
        >
            <FontAwesomeIcon icon={faPlusSquare} /> Crear
        </button>
    );
};
