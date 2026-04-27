import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { juegosReducer } from "../reducer/juegosReducer";

const JuegosContext = createContext();

const API_URL = "http://localhost:3001/juegos";

export function JuegosProvider({ children }) {
  const [juegos, dispatch] = useReducer(juegosReducer, []);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [juegoEditando, setJuegoEditando] = useState(null);

  const obtenerJuegos = async () => {
    try {
      setCargando(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Error al obtener juegos");
      }

      const data = await response.json();

      dispatch({
        type: "CARGAR_JUEGOS",
        payload: data,
      });

      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerJuegos();
  }, []);

  const agregarJuego = async (nuevoJuego) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoJuego),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al crear juego");
      }

      dispatch({
        type: "AGREGAR_JUEGO",
        payload: data,
      });

      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const actualizarJuego = async (id, juegoActualizado) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(juegoActualizado),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al actualizar juego");
      }

      dispatch({
        type: "EDITAR_JUEGO",
        payload: data,
      });

      setJuegoEditando(null);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const eliminarJuego = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al eliminar juego");
      }

      dispatch({
        type: "ELIMINAR_JUEGO",
        payload: id,
      });

      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <JuegosContext.Provider
      value={{
        juegos,
        cargando,
        error,
        juegoEditando,
        setJuegoEditando,
        agregarJuego,
        actualizarJuego,
        eliminarJuego,
      }}
    >
      {children}
    </JuegosContext.Provider>
  );
}

export function useJuegos() {
  return useContext(JuegosContext);
}
