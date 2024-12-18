import { useContext } from "react";
import { BarraDeNavegacionLink } from "./BarraDeNavegacionLink";
import './navbar.css';
import { AuthContext } from "../../context/AuthContext";

export const BarraDeNavegacion = () => {
    const { logout, userCredential } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    const isAdmin = () => userCredential?.roles.includes('ROLE_ADMIN');

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <a className="navbar-brand" href="#">EventosTP</a>
            <div className="navbar-nav container-fuild">
                <BarraDeNavegacionLink linkContent="Inscripciones" linkHref="/inscripciones" />
                <BarraDeNavegacionLink linkContent="Eventos" linkHref="/eventos" />
                {isAdmin() && (
                    <BarraDeNavegacionLink linkContent="Gestion de Locaciones" linkHref="/locaciones" />
                )}
                <div className="container-btn">
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={handleLogout}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </nav>
    );
};
