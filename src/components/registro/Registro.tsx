import { FormEvent, useEffect, useRef } from "react"
import { CampoFormulario } from "../formulario/CampoFormulario.js";
import { useNavigate } from "react-router-dom";
import { registro } from "../../api/Registro.js";
import { LinkLogin } from "./LinkLogin.js";
import './registro.css'

export const Registro = () => { 
    const nombreRef = useRef<HTMLInputElement>(null);
    const apellidoRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    useEffect( () => {
        nombreRef.current?.focus();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const user = {
            nombre: nombreRef.current?.value,
            apellido: apellidoRef.current?.value,
            email: emailRef.current?.value,
            password: passwordRef.current?.value
        }

        try{
            //TODO: Refactorizar para enviar el user como objeto en vez de pasarle los atributos por separado.
            const response = await registro(user.nombre!, user.apellido!, user.email!, user.password!);
            if(response.status === 200) {
                navigate("/");
            }
        } catch (err) {
            console.log('Respuesta de servidor con error: ' + err);  
        }
        
    }

    return (
        <div className="center">
            <div className="container-sm w-25">
                <h1>Registro</h1>
                <form onSubmit={handleSubmit}>
                    <CampoFormulario labelContent="Nombre" inputRef={nombreRef} inputType="text" required/>
                    <CampoFormulario labelContent="Apellido" inputRef={apellidoRef} inputType="text" required />
                    <CampoFormulario labelContent="Email" inputRef={emailRef} inputType="email" required />
                    <CampoFormulario labelContent="Contraseña" inputRef={passwordRef} inputType="password" required />
                    <button type="submit" className="btn btn-primary">Registrarme</button>
                </form>
                <LinkLogin />
            </div>
        </div>
        
        
    )
}