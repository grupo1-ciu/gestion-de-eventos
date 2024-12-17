import React, { useContext, useEffect, useState } from 'react';
import { obtenerLocaciones, buscarLocaciones, eliminarLocacion, filtrarLocaciones } from '../../api/Locaciones';
import { Locacion } from '../../model/Locacion';
import './Locaciones.css';
import { AuthContext } from '../../context/AuthContext';
import { LocacionBotonCrear } from './LocacionBotonCrear';
import { LocacionBotonCancelar } from './LocacionBotonCancelar';
import { LocacionBotonActualizar } from './LocacionBotonActualizar';
import { useNavigate } from 'react-router-dom';

export const Locaciones: React.FC = () => {
  const [locaciones, setLocaciones] = useState<Locacion[]>([]);
  const [page, setPage] = useState(0);
  const [isAdmin, setIsAdmin] = useState(true);
  const [search, setSearch] = useState('');
  const [capacity, setCapacity] = useState<number | undefined>(undefined);
  const { userCredential } = useContext(AuthContext);
  const navigate = useNavigate();

  const obtenerToken = (): string | null => {
    const userString = sessionStorage.getItem('user');
    if (!userString) {
      console.error('No se encontró el usuario en sessionStorage.');
      return null;
    }

    try {
      const user = JSON.parse(userString);
      return user.token || null;
    } catch (error) {
      console.error('Error al parsear la informacion del usuario:', error);
      return null;
    }
  };

  useEffect(() => {
    const token = obtenerToken();
    if (!token) return;
    if (isAdmin) {
      obtenerLocaciones(page, 10)
        .then(setLocaciones)
        .catch((error) => console.error('Error al obtener locaciones:', error));
    }
  }, [page, isAdmin]);

  const handleSearch = async () => {
    try {
      if (search && capacity !== undefined) {
        const resultadosPorNombre = await buscarLocaciones(search);
        const resultadosFiltrados = resultadosPorNombre.filter(
          (locacion) => locacion.capacidadMaxima >= (capacity || 0)
        );
        setLocaciones(resultadosFiltrados);
      } else if (search) {
        const resultados = await buscarLocaciones(search);
        setLocaciones(resultados);
      } else if (capacity !== undefined) {
        const resultados = await filtrarLocaciones(capacity);
        setLocaciones(resultados);
      }
    } catch (error) {
      console.error('Error al buscar locaciones:', error);
    }
  };

  const handleEliminarLocacion = async (idLocacion: string) => {
    const token = obtenerToken();
    if (!token) return;

    try {
      await eliminarLocacion(idLocacion);
      setLocaciones((prev) => prev.filter((locacion) => locacion.id !== idLocacion));
    } catch (error) {
      console.error(`Error al intentar eliminar la locacion ${idLocacion}:`, error);
    }
  };


  const handleEditarLocacion = (idLocacion: string) => {
    navigate(`/editar-locacion/${idLocacion}`);
  };

  const tieneEstacionamiento = (tieneEstacionamiento: boolean) => {
    return tieneEstacionamiento ? 'Sí' : 'No';
  };

  return (
    <div className="locaciones-container">
      <h1>Gestión de Locaciones    <LocacionBotonCrear className="btn btn-success" titulo="Crear" /></h1>
      <div className="locanciones-actions">
        <input
          type="text"
          placeholder="Buscar locaciones por nombre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="number"
          placeholder="Filtrar por capacidad"
          value={capacity || ''}
          onChange={(e) => setCapacity(Number(e.target.value) || undefined)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <ul className="locaciones-list">
        {locaciones.map((locacion) => (
          <li key={locacion.id} className="locacion-item">
            <h2>{locacion.nombre}</h2>
            <p>{locacion.direccion}</p>
            <p>Capacidad: {locacion.capacidadMaxima}</p>
            <p>Estacionamiento: {tieneEstacionamiento(locacion.tieneEstacionamiento)}</p>
            <div className="locacion-actions">
              <LocacionBotonActualizar idLocacion={locacion.id} onEdit={handleEditarLocacion} />
              <LocacionBotonCancelar idLocacion={locacion.id} onCancel={handleEliminarLocacion} />
            </div>
          </li>
        ))}
      </ul>
      <div className="locaciones-pagination">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))} disabled={page === 0}>
          ←
        </button>
        <span>Página {page + 1}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>→</button>
      </div>
      <button className="btn-back" onClick={() => navigate('/inscripciones')}>
        Volver
      </button>
    </div>
  );
};
