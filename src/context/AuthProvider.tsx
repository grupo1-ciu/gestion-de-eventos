import React, { createContext, useState } from "react";
import { UserCredential } from '../model/UserCredential';

export interface AuthContextValues {
    auth: UserCredential | null;
    setAuth: (value: UserCredential) => void;
}


const AuthContext = createContext<AuthContextValues>({
    auth: null,
    setAuth: (_: UserCredential) => {}
});

export const AuthProvider : React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [auth, setAuth] = useState<UserCredential | null>(null);

    return(
        <AuthContext.Provider value={{auth, setAuth}} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;