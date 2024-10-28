import { FormEvent, useEffect, useRef } from "react"


import { CampoFormulario } from "../formulario/CampoFormulario.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Registro = () => { 
    const nombreRef = useRef<HTMLInputElement>(null);
    const apellidoRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    useEffect( () => {
        nombreRef.current?.focus();
    }, []);

    const REGISTER_URL = "http://localhost:8080/eventos/auth/usuarios";

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try{
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({
                    nombre: nombreRef.current?.value,
                    apellido: apellidoRef.current?.value,
                    email: emailRef.current?.value,
                    password: passwordRef.current?.value
                }),
                {
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            if(response.status === 200) {
                navigate("/");
            }
        } catch (err) {
            console.log('Respuesta de servidor con error: ' + err);  
        }
        
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CampoFormulario labelContent="Nombre" inputRef={nombreRef} inputType="text" required/>
                <CampoFormulario labelContent="Apellido" inputRef={apellidoRef} inputType="text" required />
                <CampoFormulario labelContent="Email" inputRef={emailRef} inputType="email" required />
                <CampoFormulario labelContent="Contraseña" inputRef={passwordRef} inputType="password" required />
                <button type="submit" className="btn btn-primary">Registrarme</button>
            </form>
        </>
        
    )
}