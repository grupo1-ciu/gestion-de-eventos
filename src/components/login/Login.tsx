import { useContext, useState } from 'react';

import { LoginFormulario } from './LoginFormulario.js';
import { UserCredential } from '../../model/UserCredential.js';
import AuthContext from '../../context/AuthProvider.js';
import { LinkRegistro } from './LinkRegistro.js';

export const Login = () => {

    const { setAuth } = useContext(AuthContext);
    const [success, setSuccess] = useState(false);

    const handleLoginSuccess = (userCredential: UserCredential) => {
        setAuth(userCredential);
        setSuccess(true);
    };

    return(
        <>
            <LoginFormulario onSuccess={handleLoginSuccess}/>
            <LinkRegistro />
        </>
    )
}