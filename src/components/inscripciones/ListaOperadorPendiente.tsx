import React, { useEffect, useState } from "react";
import {InscripcionesTable} from "./InscripcionesTable";
import { obtenerPendientes} from "../../api/InscripcionesApi";
import { Inscripcion } from "../../model/Inscripcion";

const ListaOperadorPendiente: React.FC = () => {
  const [inscriptions, setInscriptions] = useState<Inscripcion[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerPendientes();
        setInscriptions(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las inscripciones pendientes.");
      }
    };

    fetchData();
  }, []);

  const handleCancel = (idInscripcion: string) => {
    console.log(`Cancelando inscripción con ID: ${idInscripcion}`);
    setInscriptions((prev) =>
      prev.filter((inscripcion) => inscripcion.id !== idInscripcion)
    );
  };

  return (
    <div>
      <h1>Inscripciones Pendientes</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <InscripcionesTable
        inscripciones={inscriptions}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default ListaOperadorPendiente;
