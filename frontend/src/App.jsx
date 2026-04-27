import { useState } from "react";
import FormularioJuego from "./components/FormularioJuego";
import ListaJuegos from "./components/ListaJuegos";
import Buscador from "./components/Buscador";
import { useJuegos } from "./context/JuegosContext";

function App() {
  const [busqueda, setBusqueda] = useState("");

  const {
    juegos,
    cargando,
    error,
    agregarJuego,
    actualizarJuego,
    eliminarJuego,
    juegoEditando,
    setJuegoEditando,
  } = useJuegos();

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
