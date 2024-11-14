import axios from "axios";


const eventosApi = axios.create({
    baseURL: window.location.protocol + "//" + window.location.host + '/api'
});

eventosApi.interceptors.request.use(
    config =>{
        const userDataRaw = sessionStorage.getItem('user');

        if(userDataRaw){
            const userData = JSON.parse(userDataRaw);
            const token = userData.token;
            console.log(token);
            if(token && !config.url?.includes('generateToken')){
                config.headers!.Authorization = 'Bearer ' + token;

            }
        }
        config.headers!['Content-Type'] = 'application/json';
        return config;
    }
)

export default eventosApi
