import { Link } from "react-router-dom"


export const LinkLogin = () => {
    return(
        <>
            <p>
                Ya tengo una cuenta, no jodas! <br />
                <span className="line">
                    {/*router link a página de Registro*/}
                    <Link to="/">Ir al login</Link>
                </span>
            </p>
        </>
    )
}