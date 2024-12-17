
import { useContext, useState } from 'react';

import { LoginFormulario } from './LoginFormulario.js';
import { UserCredential } from '../../model/UserCredential.js';
import AuthContext from '../../context/AuthProvider.js';
import { LinkRegistro } from './LinkRegistro.js';

export const Login = () => {

    const {login, authenticated} = useContext(AuthContext);
    // const { auth, setUserCredential } = useContext(AuthContext);
    const [success, setSuccess] = useState(false);

    const handleLoginSuccess = (userCredential: UserCredential) => {
        login(userCredential);
        // setAuth(userCredential);
        console.log(authenticated);
        setSuccess(true);
        sessionStorage.setItem('user', JSON.stringify(userCredential));
    };

    return(
        <>
            <LoginFormulario onSuccess={handleLoginSuccess}/>
            <LinkRegistro />
        </>
    )
}
