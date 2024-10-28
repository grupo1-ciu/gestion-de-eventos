
type NavbarLinkProps = {
    linkContent: string;
    linkHref: string;
}

export const NavbarLink: React.FC<NavbarLinkProps> = ({ linkContent, linkHref }) => {
    return (
        <a className={"nav-link " + (location.pathname === linkHref? "active" : "")} href={linkHref}>{linkContent}</a>
    )
}