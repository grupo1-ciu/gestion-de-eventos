import { LoginRealizado } from './LoginRealizado';
import { useRef, useState, useEffect, useContext} from 'react';
import AuthContext from '../context/AuthProvider';

import axios from './../api/axios';
const LOGIN_URL = '/auth/generateToken';

export const Login = () => {

    const { setAuth } = useContext(AuthContext);

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect( () => {
        userRef.current.focus();
    }, []);

    useEffect( () => {
        setErrMessage('');
    }, [user, password]);

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        try{
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({username:user, password}),
                {
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({user, password, roles, accessToken});
            setUser('');
            setPassword('');
            setSuccess(true);
        } catch (err) {
            if(!err?.response) {
                setErrMessage('No hay respuesta del servidor');
            } else if(err.response?.status === 400) {
                setErrMessage('Olvidaste tu usuario o contraseña');
            } else if(err.response?.status === 401) {
                setErrMessage('Unauthorized');
            } else {
                setErrMessage('Falló el login');
            }
            errRef.current.focus();
        }
        
    }

    return(
        <>
            {success ? (
                <LoginRealizado /> 
            ) : (
                <section>
                    <p ref={errRef} className={errMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errMessage}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Email</label>
                        <input type="text" 
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
        
                        <label htmlFor="password">Password</label>
                        <input type="password" 
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        ¿Necesitas una cuenta? <br />
                        <span className="line">
                            {/*router link a página de Registro*/}
                            <a href="#">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}