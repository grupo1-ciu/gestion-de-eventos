export const obtenerPendientes = async () => {
    const token = localStorage.getItem("authToken");
    const response = await fetch("http://localhost:8080/inscripciones/pendientes", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Error al obtener inscripciones pendientes");
    }
  
    return response.json();
  };
  