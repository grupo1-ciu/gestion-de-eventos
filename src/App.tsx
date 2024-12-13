import { Routes, Route } from 'react-router-dom';
import { Login } from './components/login/Login'
import { Registro } from './components/registro/Registro';
import { Inscripciones } from './components/inscripciones/Inscripciones';
import { EventoFormulario } from './components/eventos/EventoFormulario';
import { EventosPagina } from './components/eventos/EventosPagina';
import { Protected } from './Protected';
import { EventoDetalle } from './components/eventos/EventoDetalle';
import { FormularioEditarEvento } from './components/eventos/FormularioEditarEvento';

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route element={<Protected/>}>
          <Route path="/inscripciones" element= {<Inscripciones/>} />
          <Route path="/eventos" element={<EventosPagina />} />
          <Route path="eventos/:id" element={<EventoDetalle/>} />
          <Route path="/crearEvento" element={<EventoFormulario/>} />
          <Route path="/eventos/editar/:id" element={<FormularioEditarEvento />} />
        </Route>
      </Routes>
    </>
  )
}

export default App