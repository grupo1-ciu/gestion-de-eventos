import { useEffect, useRef, useState } from "react";
import { CampoFormulario } from "../formulario/CampoFormulario";
import { UserCredential } from "../../model/UserCredential";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/Login";
import AuthContext from "../../context/AuthProvider";

interface LoginFormularioProps {
    onSuccess: (userCredential: UserCredential) => void;
}

export const LoginFormulario: React.FC<LoginFormularioProps> = ({ onSuccess }) => {

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
        const response = await login(username!, password!);

        console.log(JSON.stringify(response?.data));
        
        const userCredentials: UserCredential = {
            nombre: response?.data?.nombre,
            apellido: response?.data?.apellido,
            token: response?.data?.token,
            roles: response?.data?.roles,
            email: response?.data?.email,
            isAuthenticated: true,
        }
        
        onSuccess(userCredentials);
        
        if(response.status === 200){
            navigate("/inscripciones");
        }
    }

    return (
        <div className="container-sm w-25">
            <p ref={errRef} className={errMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errMessage}</p>
            <h1>Ingresar</h1>
            <form onSubmit={handleSubmit}>
                <CampoFormulario inputRef={usernameRef} inputType="text" labelContent="email" required/>
                <CampoFormulario inputRef={passwordRef} inputType="password" labelContent="password" required/>
                <button className="btn btn-primary">Ingresar</button>
            </form>
        </div>
    )
}



