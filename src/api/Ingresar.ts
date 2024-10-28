import axios from "axios";

const LOGIN_URL = 'http://localhost:8080/eventos/auth/generateToken';

export const ingresar = async (username: string, password: string) => {
    const response = await axios.post(LOGIN_URL, 
        JSON.stringify({username, password}),
    {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    });

    return response;
}