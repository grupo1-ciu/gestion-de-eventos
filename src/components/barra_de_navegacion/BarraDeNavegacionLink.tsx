import { Link } from "react-router-dom";

type NavbarLinkProps = {
    linkContent: string;
    linkHref: string;
}

export const BarraDeNavegacionLink: React.FC<NavbarLinkProps> = ({ linkContent, linkHref }) => {
    return (
        <Link 
            className={"nav-link " + (location.pathname === linkHref? "active" : "")} 
            to={linkHref}
        >
            {linkContent}
        </Link>
    )
}