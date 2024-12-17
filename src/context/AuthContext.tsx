import React from "react";
import { UserCredential } from "../model/UserCredential";

export interface AuthContextType {
    userCredential: UserCredential | null; 
    authenticated: boolean;
    login: (userCredential: UserCredential) => void; 
    logout: () => void;
  }
  
 
  export const AuthContext = React.createContext<AuthContextType>({
    userCredential: null, 
    authenticated: false,
    login: () => {}, 
    logout: () => {},
  });