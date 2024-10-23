import { Routes, Route } from 'react-router-dom';
import { Login } from './components/login/Login'
import { Registro } from './components/registro/Registro';
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Registro />} />
      </Routes>
    </>
  )
}

export default App
