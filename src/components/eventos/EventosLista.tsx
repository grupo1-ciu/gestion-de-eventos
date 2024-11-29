import { Evento } from "../../model/Evento"
import { EventoCard } from "./EventoCard"
import './eventos.css'

type EventosListaProps = {
    eventos: Evento[]
}

export const EventosLista: React.FC<EventosListaProps> = ({ eventos }) => {

    return(
        <div className="eventos-container">
            {
                eventos.map((evento) => <EventoCard key={evento.descripcion} evento={evento}/>)
            }
        </div>
    )
}