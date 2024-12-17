import { Link } from "react-router-dom"
import { Evento } from "../../model/Evento"

type EventoProps = {
    evento: Evento
}

export const EventoCard: React.FC<EventoProps> = ({evento}) => {
    return(
        <div className="card" style={{width: 18 + 'rem', margin: 2}}>
            <img src="teatro.jpg" className="card-img-top" alt="Teatro Colón" />
            <div className="card-body">
                <h5 className="card-title">{evento.descripcion}</h5>
                <p className="card-text">{evento.sala}</p>
                <Link to={'/eventos/'+evento.id} className="btn btn-primary">Más info</Link>
            </div>
        </div>
    )
}