import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { actualizarLocacion, crearLocacion } from '../../api/Locaciones';
import eventosApi from '../../api/EventosApi';
import './LocacionFormulario.css';

export const FormularioLocacion = () => {
  const { idLocacion } = useParams(); 
  const navigate = useNavigate();

  const [locacion, setLocacion] = useState({
    id: '',
    nombre: '',
    direccion: '',
    capacidadMaxima: 0,
    tieneEstacionamiento: false,
  });


  const obtenerLocacion = async (idLocacion: string) => {
    try {
      const response = await eventosApi.get(`/locaciones/${idLocacion}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener locacion:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (idLocacion) {
      const fetchLocacionDetails = async () => {
        try {
          const data = await obtenerLocacion(idLocacion);
          setLocacion(data);
        } catch (error) {
          console.error('Error al obtener los detalles de la locación:', error);
        }
      };
      fetchLocacionDetails();
    }
  }, [idLocacion]);

  // Manejo de inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLocacion(prevLocacion => ({
      ...prevLocacion,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (idLocacion) {
        await actualizarLocacion(locacion.id, locacion);
      } else {
        await crearLocacion(locacion);
      }
      navigate('/locaciones');
    } catch (error) {
      console.error('Error al guardar la locacion:', error);
      alert('Error al guardar la locacion. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="locacion-editar center">
      <h2>{idLocacion ? 'Editar Locacion' : 'Crear Locacion'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="nombre" value={locacion.nombre} onChange={handleChange} />
        </label>
        <label>
          Dirección:
          <input type="text" name="direccion" value={locacion.direccion} onChange={handleChange} />
        </label>
        <label>
          Capacidad Máxima:
          <input type="number" name="capacidadMaxima" value={locacion.capacidadMaxima} onChange={handleChange} />
        </label>
        <label>
          Tiene Estacionamiento:
          <input
            type="checkbox"
            name="tieneEstacionamiento"
            checked={locacion.tieneEstacionamiento}
            onChange={handleChange}
          />
        </label>
        <button type="submit">{idLocacion ? 'Guardar Cambios' : 'Crear Locación'}</button>
      </form>
    </div>
  );
};
