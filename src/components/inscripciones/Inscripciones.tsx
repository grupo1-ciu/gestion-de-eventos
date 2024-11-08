import { useEffect, useState } from "react"
import { BarraDeNavegacion } from "../barra_de_navegacion/BarraDeNavegacion"
import { listarInscripcionesPorEmail } from "../../api/Inscripciones";
import { InscripcionesTable } from "./InscripcionesTable";


export const Inscripciones = () => {

    const [inscripciones, setInscripciones] = useState([]);
    
    const userDataRaw = sessionStorage.getItem('user');
    console.log(userDataRaw);
    const userData = JSON.parse(userDataRaw!);
    const email = userData.email;

    const fetchInscripciones = async (email: string) => {
        const inscripcionesResponse = await listarInscripcionesPorEmail(email);
        setInscripciones(inscripcionesResponse);
    }
    

    useEffect(()=>{
        fetchInscripciones(email);
    }, [email])

    return(
        <>
            <BarraDeNavegacion />
            <InscripcionesTable inscripciones={inscripciones}/>
        </>
    )
}