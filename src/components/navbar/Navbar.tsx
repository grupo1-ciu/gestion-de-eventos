import { NavbarLink } from "./NavbarLink"


export const Navbar = () => {
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <a className="navbar-brand" href="#">Eventos</a>
            <div className="navbar-nav">
                <NavbarLink linkContent="Ir a inicio" linkHref="/home"/>
                <NavbarLink linkContent="Inscripciones" linkHref="/inscripciones" />
                <NavbarLink linkContent="Eventos" linkHref="/eventos"/>
            </div>
        </nav>
    )
}