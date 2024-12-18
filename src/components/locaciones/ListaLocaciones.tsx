import React from 'react';
import { Locacion } from '../../model/Locacion';
import { LocacionBotonCrear } from './LocacionBotonCrear';
import { LocacionBotonActualizar } from './LocacionBotonActualizar';
import { LocacionBotonCancelar } from './LocacionBotonCancelar';

interface ListaLocacionesProps {
  locaciones: Locacion[];
  isAdmin: boolean;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  capacity: number | undefined;
  setCapacity: React.Dispatch<React.SetStateAction<number | undefined>>;
  handleSearch: () => void;
  handleEditarLocacion: (idLocacion: string) => void;
  handleEliminarLocacion: (idLocacion: string) => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  navigate: (path: string) => void;
}

export const ListaLocaciones: React.FC<ListaLocacionesProps> = ({
  locaciones,
  isAdmin,
  search,
  setSearch,
  capacity,
  setCapacity,
  handleSearch,
  handleEditarLocacion,
  handleEliminarLocacion,
  page,
  setPage,
  navigate,
}) => {
  return (
    <div className="locaciones-container">
      <h1>
        Gestión de Locaciones{' '}
        {isAdmin && <LocacionBotonCrear className="btn btn-success" titulo="Crear" />}
      </h1>
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
            <p>Estacionamiento: {locacion.tieneEstacionamiento ? 'Sí' : 'No'}</p>
            {isAdmin && (
              <div className="locacion-actions">
                <LocacionBotonActualizar idLocacion={locacion.id} onEdit={handleEditarLocacion} />
                <LocacionBotonCancelar idLocacion={locacion.id} onCancel={handleEliminarLocacion} />
              </div>
            )}
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



