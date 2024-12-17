
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/login/Login'
import { Registro } from './components/registro/Registro';
import { Inscripciones } from './components/inscripciones/Inscripciones';
import { EventosPagina } from './components/eventos/EventosPagina';
import { Protected } from './Protected';
import { EventoDetalle } from './components/eventos/EventoDetalle';
import  { Locaciones }  from './components/locaciones/Locaciones';
import { FormularioLocacion } from './components/locaciones/FormularioLocacion';

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
          <Route path="/locaciones" element={<Locaciones />} />
          <Route path="/locaciones/editar/:idLocacion" element={<FormularioLocacion />} />
          <Route path="/locaciones/crear" element={<FormularioLocacion />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
