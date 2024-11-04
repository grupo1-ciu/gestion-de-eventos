import { BarraDeNavegacionLink } from "./BarraDeNavegacionLink"


export const BarraDeNavegacion = () => {
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <a className="navbar-brand" href="#">Eventos</a>
            <div className="navbar-nav">
                <BarraDeNavegacionLink linkContent="Inscripciones" linkHref="/inscripciones" />
                <BarraDeNavegacionLink linkContent="Eventos" linkHref="/eventos"/>
            </div>
        </nav>
    )
}