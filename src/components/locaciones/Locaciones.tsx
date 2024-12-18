import React, { useContext, useEffect, useState } from 'react';
import { buscarLocaciones, eliminarLocacion, filtrarLocaciones, obtenerLocaciones } from '../../api/Locaciones';
import { Locacion } from '../../model/Locacion';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ListaLocaciones } from './ListaLocaciones';
import './Locaciones.css';


export const Locaciones: React.FC = () => {
  const [locaciones, setLocaciones] = useState<Locacion[]>([]);
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0); 
  const [capacity, setCapacity] = useState<number | undefined>(undefined);
  const [search, setSearch] = useState('');
  const [pageSize] = useState(5); 
  const { userCredential } = useContext(AuthContext);
  const navigate = useNavigate();

  const isAdmin = userCredential?.roles?.includes('ROLE_ADMIN') || false;

  const obtenerToken = (): string | null => {
    const userString = sessionStorage.getItem('user');

    if (!userString) return null;

    try {
      const user = JSON.parse(userString);
      return user.token || null;
    } catch {
      return null;
    }
  };

  const cargarLocaciones = async (pagina: number) => {
    try {
      const todasLasLocaciones = await obtenerLocaciones(0, 1000);
      const inicio = pagina * pageSize;
      const fin = inicio + pageSize;
      setLocaciones(todasLasLocaciones.slice(inicio, fin));
      setTotalItems(todasLasLocaciones.length);
    } catch (error) {
      console.error('Error al cargar locaciones:', error);
    }
  };
  
  useEffect(() => {
    cargarLocaciones(page);
  }, [page]);

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

  return (

<ListaLocaciones
      locaciones={locaciones}
      isAdmin={isAdmin}
      search={search}
      setSearch={setSearch}
      capacity={capacity}
      setCapacity={setCapacity}
      handleSearch={handleSearch}
      handleEditarLocacion={handleEditarLocacion}
      handleEliminarLocacion={handleEliminarLocacion}
      page={page}
      setPage={setPage}
      navigate={navigate}
    />
  );
};
