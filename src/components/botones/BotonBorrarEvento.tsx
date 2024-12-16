import React from "react";
import { useNavigate } from "react-router-dom";
import { borrarEvento } from "../../api/Eventos";

interface BotonBorrarEventoProps {
    idEvento: string;
    onMensaje: (mensaje: string) => void;
}

export const BotonBorrarEvento: React.FC<BotonBorrarEventoProps> = ({ idEvento, onMensaje }) => {
    const navigate = useNavigate();

    const handleBorrarEvento = async () => {
        try {
            const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este evento?");
            if (confirmacion) {
                await borrarEvento(idEvento);
                onMensaje("Evento eliminado correctamente.");
                navigate("/eventos");
            }
        } catch (err) {
            console.error("Error al borrar el evento:", err);
            onMensaje("Error al eliminar el evento.");
        }
    };

    return (
        <button
            className="btn btn-danger btn-lg"
            type="button"
            onClick={handleBorrarEvento}
        >
            Borrar
        </button>
    );
};
