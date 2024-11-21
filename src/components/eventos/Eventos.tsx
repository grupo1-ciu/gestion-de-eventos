import { useEffect, useState } from "react"
import { BarraDeNavegacion } from "../barra_de_navegacion/BarraDeNavegacion"
import { EventosLista } from "./EventosLista"
import { listarEventos } from "../../api/Eventos"


export const Eventos = () => {

    const [ eventos, setEventos] = useState([]);
    
    const fetchEventos = async () => {
        const response = await listarEventos();
        setEventos(response);
    }

    useEffect(() =>{
        fetchEventos();
    }, [])

    return(
        <>
            <BarraDeNavegacion />
            <div>
                <EventosLista eventos={eventos}/>
            </div>
        </>
    )
}