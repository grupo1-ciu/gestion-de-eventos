import { Evento } from "../../model/Evento"

type EventoProps = {
    evento: Evento
}

export const EventoCard: React.FC<EventoProps> = ({evento}) => {
    return(
        <div className="card" style={{width: 18 + 'rem', margin: 1}}>
            <img src="teatro.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{evento.descripcion}</h5>
                <p className="card-text">{evento.sala}</p>
                <a href="#" className="btn btn-primary">Inscribirse</a>
            </div>
        </div>
    )
}