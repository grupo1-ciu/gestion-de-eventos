import { useEffect, useRef, useState } from "react";
import { CampoFormulario } from "../formulario/CampoFormulario";
import { UserCredential } from "../../model/UserCredential";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ingresar, Ingresar } from "../../api/Ingresar";

interface LoginFormularioProps {
    onSuccess: (userCredential: UserCredential) => void;
}

export const LoginFormulario: React.FC<LoginFormularioProps> = ({ onSuccess }) => {

    const LOGIN_URL = 'http://localhost:8080/eventos/auth/generateToken';

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const errRef = useRef();
    const navigate = useNavigate();
    const [errMessage, setErrMessage] = useState('');

    useEffect( () => {
        usernameRef.current?.focus();
        setErrMessage('');
    }, []);

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await ingresar(username!, password!);

        console.log(response);
        console.log(JSON.stringify(response?.data));
        
        const nombre = response?.data?.nombre;
        const apellido = response?.data?.apellido;
        const token = response?.data?.token;
        const roles = response?.data?.roles;
        onSuccess({nombre, apellido, roles, token});
        if(response.status === 200){
            navigate("/home");
        }
    }

    return (
        <section>
            <p ref={errRef} className={errMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errMessage}</p>
            <h1>Ingresar</h1>
            <form onSubmit={handleSubmit}>
                <CampoFormulario inputRef={usernameRef} inputType="text" labelContent="email" required/>
                <CampoFormulario inputRef={passwordRef} inputType="password" labelContent="password" required/>
                <button className="btn btn-primary">Ingresar</button>
            </form>
        </section>
    )
}



