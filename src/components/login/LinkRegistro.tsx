import { Link } from "react-router-dom"

export const LinkRegistro = () => {
    return (
        <div className="container-sm w-25">
            <p>
                ¿Necesitas una cuenta? <br />
                <span className="line">
                    {/*router link a página de Registro*/}
                    <Link to="register">Registrarse</Link>
                </span>
            </p>
        </div>
        
    )
}