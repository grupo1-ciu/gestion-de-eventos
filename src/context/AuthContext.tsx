import React from "react";
import { UserCredential } from "../model/UserCredential";

export const AuthContext = React.createContext({
    userCredential: {},
    authenticated: false,
    login: (userCredential: UserCredential) => {},
    logout: () => {}
})