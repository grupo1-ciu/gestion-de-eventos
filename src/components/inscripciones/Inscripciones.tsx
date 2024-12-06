import { useEffect, useState } from "react"
import { BarraDeNavegacion } from "../barra_de_navegacion/BarraDeNavegacion"
import { cancelarInscripcion, listarInscripcionesPorEmail } from "../../api/Inscripciones";
import { InscripcionesTable } from "./InscripcionesTable";
import { useNavigate } from "react-router-dom";
import { TextoCarga } from "./TextoCarga";
import './inscripciones.css'


export const Inscripciones = () => {

    const [inscripciones, setInscripciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    const userDataRaw = sessionStorage.getItem('user');
    const userData = JSON.parse(userDataRaw!);
    const email = userData.email;

    const fetchInscripciones = async (email: string) => {
        const inscripcionesResponse = await listarInscripcionesPorEmail(email);
        setInscripciones(inscripcionesResponse);
        setCargando(false);
    }

    const handleCancelarInscripcion = async (idInscripcion: string) => {
        const response = await cancelarInscripcion(idInscripcion);
        if (response.status === 200) {
            fetchInscripciones(email);
        }
    }

    const handleNavigate = () => {
        navigate('/eventos');
    }
    

    useEffect(()=>{
        fetchInscripciones(email);
    }, [email])

    return(
        <div className="container-fluid">
            <BarraDeNavegacion />
            {cargando ? (
                <TextoCarga />) : (
            inscripciones.length === 0 && !cargando ? (
                <div className="container-mensaje">
                    <h3>No tenés inscripciones</h3>
                    <button
                        type="button"
                        onClick={handleNavigate}
                        className="btn btn-lg btn-success"
                        >
                            Ir a eventos
                    </button>
                </div>
            ) : (
                <div>
                    <InscripcionesTable inscripciones={inscripciones} onCancel={handleCancelarInscripcion}/>
                </div>
            ))}
        </div>
    )
}