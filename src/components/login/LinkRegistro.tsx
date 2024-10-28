import { Link } from "react-router-dom"

export const LinkRegistro = () => {
    return (
        <>
            <p>
                ¿Necesitas una cuenta? <br />
                <span className="line">
                    {/*router link a página de Registro*/}
                    <Link to="register">Registrarse</Link>
                </span>
            </p>
        </>
        
    )
}