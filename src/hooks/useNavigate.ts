import React from 'react';

import { useNavigate } from 'react-router-dom';

const VolverBoton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);  
  };

  return (
    <button onClick={handleBack}>Volver</button>
  );
};

export default VolverBoton;
