import { useEffect, useState } from "react"
import { BarraDeNavegacion } from "../barra_de_navegacion/BarraDeNavegacion"
import { EventosLista } from "./EventosLista"
import { listarEventos } from "../../api/Eventos"
import './eventos.css'


export const EventosPagina = () => {

    const [ eventos, setEventos] = useState([]);
    const [cargando, setCargando] = useState(true);
    
    const fetchEventos = async () => {
        const response = await listarEventos();
        setEventos(response);
        setCargando(false);
    }

    useEffect(() =>{
        fetchEventos();
    }, [])

    return(
        <>
            <BarraDeNavegacion />
            <div>
                {   cargando ? (
                        <div className="container-mensaje">
                            <h1>Cargando eventos...</h1>
                        </div>
                    ) : (
                        eventos.length === 0 && !cargando ? (<h1>No hay eventos disponibles</h1>   
                    ):(
                        <EventosLista eventos={eventos}/>
                    )
                )}
            </div>
        </>
    )
}