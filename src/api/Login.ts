import eventosApi  from "./EventosApi";

const LOGIN_URL = '/auth/generateToken';

export const login = async (username: string, password: string) => {
    const response = await eventosApi.post(LOGIN_URL, 
        JSON.stringify({username, password}),
    {
        withCredentials: true
    });

    return response;
}