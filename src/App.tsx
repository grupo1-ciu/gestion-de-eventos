import { Routes, Route } from 'react-router-dom';
import { Login } from './components/login/Login'
import { Registro } from './components/registro/Registro';
import { Home } from './components/home/Home';
import { Inscripciones } from './components/inscripciones/Inscripciones';
import { Eventos } from './components/eventos/Eventos';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/inscripciones" element= {<Inscripciones/>} />
        <Route path="/eventos" element={<Eventos />} />
      </Routes>
    </>
  )
}

export default App
