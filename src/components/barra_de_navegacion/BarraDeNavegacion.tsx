import { useContext } from "react"
import { BarraDeNavegacionLink } from "./BarraDeNavegacionLink"
import './navbar.css'
import { AuthContext } from "../../context/AuthContext"


export const BarraDeNavegacion = () => {

    const { logout } = useContext(AuthContext);


    const handleLogout = () => {
        
        logout();
    }

    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <a className="navbar-brand" href="#">EventosTP</a>
            <div className="navbar-nav">
                <BarraDeNavegacionLink linkContent="Inscripciones" linkHref="/inscripciones" />
                <BarraDeNavegacionLink linkContent="Eventos" linkHref="/eventos"/>
            </div>
            <div>
                <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={handleLogout}
                >
                    Cerrar Sesión
                </button>
            </div>
        </nav>
    )
}