import { LoginResponse } from "../model/LoginResponse"
import { UserCredential } from "../model/UserCredential"
import axios from "axios"

export const useLogin = () => {
    
    const LOGIN_URL = '/auth/generateToken'

    const fetchToken = async(userCredential: UserCredential) => {
        await axios.post<LoginResponse>(LOGIN_URL, userCredential);
    }
    
    return fetchToken;
}