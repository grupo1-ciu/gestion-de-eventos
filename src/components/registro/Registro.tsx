import { FormEvent, useEffect, useRef, useState } from "react"

import axios from '../../api/axios.js';

export const Registro = () => {
    const userNameRef = useRef<HTMLInputElement>(null);
    

    const [ userName, setUserName ] = useState('');
    const [ userLastName, setUserLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPasword ] = useState('');

    useEffect( () => {
        userNameRef.current?.focus();
    }, []);

    const REGISTER_URL = "/auth/addNewUser";

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try{
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({
                    nombre: userName,
                    apellido: userLastName,
                    email,
                    password
                }),
                {
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    withCredentials: true
                }
            );
            setUserName('');
            setUserLastName('');
            setEmail('');
            setPasword('');
        } catch (err) {
            console.log('Respuesta de servidor con error: ' + err);
            
        }
        
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="exampleInputName1" aria-describedby="nameHelp" ref={userNameRef} value={userName} onChange={(e) => setUserName(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputLastName" className="form-label">Apellido</label>
                    <input type="text" className="form-control" id="exampleInputLastName1" aria-describedby="lastNamelHelp" value={userLastName} onChange={(e) => setUserLastName(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="ejemplo@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPasword(e.target.value)} required/>
                </div>
                <button type="submit" className="btn btn-primary">Registrarme</button>
            </form>
        </>
        
    )
}