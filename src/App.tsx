import { Routes, Route } from 'react-router-dom';
import { Login } from './components/login/Login'
import { Registro } from './components/registro/Registro';
import { Inscripciones } from './components/inscripciones/Inscripciones';
import { Eventos } from './components/eventos/Eventos';
import { Protected } from './Protected';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route element={<Protected/>}>
          <Route path="/inscripciones" element= {<Inscripciones/>} />
          <Route path="/eventos" element={<Eventos />} />  
        </Route>
      </Routes>
    </>
  )
}

export default App