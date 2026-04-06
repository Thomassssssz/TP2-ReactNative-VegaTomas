import ItemJuego from "./ItemJuego";

function ListaJuegos({ juegos, eliminarJuego, setJuegoEditando }) {
  if (juegos.length === 0) {
    return <p>No hay videojuegos para mostrar.</p>;
  }

  return (
    <div className="lista">
      {juegos.map((juego) => (
        <ItemJuego
          key={juego.id}
          juego={juego}
          eliminarJuego={eliminarJuego}
          setJuegoEditando={setJuegoEditando}
        />
      ))}
    </div>
  );
}

export default ListaJuegos;
