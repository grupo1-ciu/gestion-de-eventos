
type NavbarLinkProps = {
    linkContent: string;
    linkHref: string;
}

export const BarraDeNavegacionLink: React.FC<NavbarLinkProps> = ({ linkContent, linkHref }) => {
    return (
        <a className={"nav-link " + (location.pathname === linkHref? "active" : "")} href={linkHref}>{linkContent}</a>
    )
}