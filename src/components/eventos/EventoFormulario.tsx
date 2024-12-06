import { FormEvent, useEffect, useRef } from "react";
import { CampoFormulario } from "../formulario/CampoFormulario.js";
import { useNavigate } from "react-router-dom";
import { crearEventos } from "../../api/Eventos.js";
import "./evento_formulario.css";

const CATEGORIAS_EVENTO = ["TALLER", "CONCIERTO", "CONFERENCIA", "EXPOSICION", "PROYECCION"];

export const EventoFormulario = () => {
    const descripcionRef = useRef<HTMLInputElement>(null);
    const salaRef = useRef<HTMLInputElement>(null);
    const capacidadRef = useRef<HTMLInputElement>(null);
    const horaInicioRef = useRef<HTMLInputElement>(null);
    const fechaEventoRef = useRef<HTMLInputElement>(null);
    const tipoEventoRef = useRef<HTMLSelectElement>(null);

    const navigate = useNavigate();

    useEffect(() => {
        descripcionRef.current?.focus();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const evento = {
            id: "",
            descripcion: descripcionRef.current?.value || "",
            sala: salaRef.current?.value || "",
            capacidad: parseInt(capacidadRef.current?.value || "0", 10),
            horaInicio: horaInicioRef.current?.value || "",
            fechaEvento: fechaEventoRef.current?.value || "",
            tipoEvento: {
                nombre: tipoEventoRef.current?.value || ""
            },
        };

        try {
            const nuevoEvento = await crearEventos(evento);
            console.log("Evento creado:", nuevoEvento);
            navigate("/eventos");
        } catch (err) {
            console.error("Error al crear el evento:", err);
        }
    };

    return (
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
                Crear Evento
            </button>
        </form>
    );
};