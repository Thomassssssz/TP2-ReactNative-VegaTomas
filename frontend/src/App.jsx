import { useEffect, useState } from "react";
import FormularioJuego from "./components/FormularioJuego";
import ListaJuegos from "./components/ListaJuegos";
import Buscador from "./components/Buscador";

const API_URL = "http://localhost:3001/juegos";

function App() {
  const [juegos, setJuegos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
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
      setJuegos(data);
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

      setJuegos([...juegos, data]);
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

      setJuegos(juegos.map((j) => (j.id === id ? data : j)));
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

      setJuegos(juegos.filter((j) => j.id !== id));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const juegosFiltrados = juegos.filter(
    (j) =>
      j.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      j.plataforma.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <div className="app">
      <header className="header">
        <h1>GameTrack</h1>
        <p>Biblioteca de videojuegos</p>
      </header>

      <main className="layout">
        <aside className="sidebar">
          <FormularioJuego
            agregarJuego={agregarJuego}
            actualizarJuego={actualizarJuego}
            juegoEditando={juegoEditando}
            setJuegoEditando={setJuegoEditando}
          />
        </aside>

        <section className="contenido">
          <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />

          {cargando && <p>Cargando juegos...</p>}
          {error && <p className="error">{error}</p>}

          {!cargando && !error && (
            <ListaJuegos
              juegos={juegosFiltrados}
              eliminarJuego={eliminarJuego}
              setJuegoEditando={setJuegoEditando}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
