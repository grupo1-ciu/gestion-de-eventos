import { PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext";
import { UserCredential } from "../model/UserCredential";

// const AuthContext = createContext({});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [userCredential, setUserCredential] = useState({});
    const [authenticated, setAuthenticated] = useState(false);

    const login = (userCredential: UserCredential) => {
        setUserCredential(userCredential);
        setAuthenticated(true);
    }

    const logout = () => {
        setUserCredential({});
        setAuthenticated(false);
        sessionStorage.clear();
    }

    return(
        <AuthContext.Provider value={{ userCredential, authenticated, login, logout}} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;