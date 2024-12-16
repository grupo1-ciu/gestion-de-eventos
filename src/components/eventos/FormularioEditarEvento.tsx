import { FormEvent, useEffect, useRef } from "react";
import { CampoFormulario } from "../formulario/CampoFormulario.js";
import { useNavigate, useParams } from "react-router-dom";
import { buscarEvento, editarEvento } from "../../api/Eventos.js";
import "./evento_formulario.css";

const CATEGORIAS_EVENTO = ["TALLER", "CONCIERTO", "CONFERENCIA", "EXPOSICION", "PROYECCION"];

export const FormularioEditarEvento = () => {
    const descripcionRef = useRef<HTMLInputElement>(null);
    const salaRef = useRef<HTMLInputElement>(null);
    const capacidadRef = useRef<HTMLInputElement>(null);
    const horaInicioRef = useRef<HTMLInputElement>(null);
    const fechaEventoRef = useRef<HTMLInputElement>(null);
    const tipoEventoRef = useRef<HTMLSelectElement>(null);

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const cargarEvento = async () => {
            try {
                const respuesta = await buscarEvento(id!);
                const evento = respuesta.data;
                if (evento) {
                    descripcionRef.current!.value = evento.descripcion;
                    salaRef.current!.value = evento.sala;
                    capacidadRef.current!.value = evento.capacidad.toString();
                    horaInicioRef.current!.value = evento.horaInicio;
                    fechaEventoRef.current!.value = evento.fechaEvento;
                    tipoEventoRef.current!.value = evento.tipoEvento.nombre;
                }
            } catch (err) {
                console.error("Error al cargar el evento:", err);
            }
        };
    
        cargarEvento();
    }, [id]);
    

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    
        const evento = {
            id: id || "",
            descripcion: descripcionRef.current?.value || "",
            sala: salaRef.current?.value || "",
            capacidad: parseInt(capacidadRef.current?.value || "0", 10),
            horaInicio: horaInicioRef.current?.value || "",
            fechaEvento: fechaEventoRef.current?.value || "",
            tipoEvento: {
                nombre: tipoEventoRef.current?.value || "",
            },
        };
    
        try {
            const eventoActualizado = await editarEvento(id!, evento);
            console.log("Evento actualizado:", eventoActualizado);
            navigate("/eventos");
        } catch (err) {
            console.error("Error al editar el evento:", err);
        }
    };    

    const handleGoHome = () => {
        navigate("/eventos");
    };

    return (
        <div className="evento-formulario-container">
            <button onClick={handleGoHome} className="btn btn-secondary">
                Volver al Home
            </button>
            <form onSubmit={handleSubmit}>
                <CampoFormulario labelContent="Descripción" inputRef={descripcionRef} inputType="text" required />
                <CampoFormulario labelContent="Sala" inputRef={salaRef} inputType="text" required />
                <CampoFormulario labelContent="Capacidad" inputRef={capacidadRef} inputType="number" required />
                <CampoFormulario labelContent="Hora de Inicio" inputRef={horaInicioRef} inputType="time" required />
                <CampoFormulario labelContent="Fecha del Evento" inputRef={fechaEventoRef} inputType="date" required />
                <CampoFormulario
                    labelContent="Tipo de Evento"
                    inputRef={tipoEventoRef}
                    inputElement="select"
                    required
                    options={CATEGORIAS_EVENTO}
                />
                <button type="submit" className="btn btn-primary">
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};
