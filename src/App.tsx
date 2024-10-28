import { Routes, Route } from 'react-router-dom';
import { Login } from './components/login/Login'
import { Registro } from './components/registro/Registro';
import { Home } from './components/home/Home';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/home" element={<Home />}/>
      </Routes>
    </>
  )
}

export default App
