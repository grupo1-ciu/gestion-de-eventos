import { useContext, useEffect, useState } from "react";
import { BarraDeNavegacion } from "../barra_de_navegacion/BarraDeNavegacion";
import { buscarEvento } from "../../api/Eventos";
import "./eventos.css"
import { inscribirUsuarioAEvento } from "../../api/Inscripciones";
import { AuthContext } from "../../context/AuthContext";


export const EventoDetalle = () => {
    const id = window.location.pathname.substring(9);
    const [evento, setEvento] = useState({});
    const { userCredential } = useContext(AuthContext);
    const [mensaje, setMensaje] = useState('');

    const formatFecha = (fecha: string) => {
        const date = new Date(fecha);
        const splits = date.toLocaleString().split(',');
        return splits[0];
    }


    const fetchEvento = async(id: string) => {
        const eventoResponse = await buscarEvento(id);
        setEvento(eventoResponse.data);
    }

    const handleInscripcion = async() => {
        const emailUsuario = userCredential.email;
        const idEvento = id;
        try{
            await inscribirUsuarioAEvento(idEvento, emailUsuario);
            setMensaje('Inscripción exitosa!');
        } catch (err) {
            if(err?.response?.status === 403) {
                setMensaje('Error en la inscripción');
            }
            if(err?.response?.status === 409) {
                setMensaje(err?.response?.data);
            }
        }
    }

    useEffect(()=> {
        fetchEvento(id);
    }, [id])

    return(
        <>
            <BarraDeNavegacion />
            <div className="banner-evento">
                <img className="background-image" src="/butacas.jpg" alt="Imagen de una fila de butacas"/>
            </div>
            <div className="evento-detalle-container">
                <h1>{evento.descripcion}</h1>
                <h3>Fecha: {formatFecha(evento.fechaEvento)}</h3>
                <h3>Horario: {evento.horaInicio}</h3>
                <h3>Lugar: {evento.sala}</h3>
                <h3>Capacidad: {evento.capacidad} lugares</h3>
            </div>
            <button 
                className="btn btn-primary btn-lg" 
                type="button"
                onClick={handleInscripcion}
            >
                Inscribirse
            </button>
            <div className="mensaje-container">
                {mensaje === '' ? '' : <h4>{mensaje}</h4>}
            </div>
        </>
    )
}