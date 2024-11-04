import { useEffect } from "react"
import { BarraDeNavegacion } from "../barra_de_navegacion/BarraDeNavegacion"
import { listarInscripciones } from "../../api/Inscripciones";


export const Inscripciones = () => {

    useEffect(()=>{
        listarInscripciones();
    }, [])
    return(
        <BarraDeNavegacion />
        
    )
}