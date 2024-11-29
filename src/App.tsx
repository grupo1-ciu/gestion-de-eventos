import { Routes, Route } from 'react-router-dom';
import { Login } from './components/login/Login'
import { Registro } from './components/registro/Registro';
import { Inscripciones } from './components/inscripciones/Inscripciones';
import { EventosPagina } from './components/eventos/EventosPagina';
import { Protected } from './Protected';
import { EventoDetalle } from './components/eventos/EventoDetalle';
import  ListaOperadorPendientes  from "./components/inscripciones/ListaOperadorPendiente";
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        
          <Route path="/inscripciones" element= {<Inscripciones/>} />
          <Route path="/eventos" element={<EventosPagina />} />
          <Route path="/eventos/:id" element={<EventoDetalle/>} />
          <Route path="/inscripciones/pendientes" element={<ListaOperadorPendientes />} />
        
      </Routes>
    </>
  )
}

export default App