export interface UserCredential {
    nombre: string;
    apellido: string;
    roles : string[];
    token : string;
    email : string;
    isAuthenticated: boolean;
}