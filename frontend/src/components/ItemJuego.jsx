import { memo } from "react";

function ItemJuego({ juego, eliminarJuego, setJuegoEditando }) {
  return (
    <div className="card">
      <div className="cover-container">
        <img
          src={
            juego.imagen ||
            "https://via.placeholder.com/300x300?text=Sin+imagen"
          }
          alt={juego.titulo}
          className="imagen"
        />
      </div>

      <div className="card-body">
        <h3>{juego.titulo}</h3>

        <p>
          <strong>Plataforma:</strong> {juego.plataforma}
        </p>
        <p>
          <strong>Género:</strong> {juego.genero}
        </p>
        <p>
          <strong>Estado:</strong> {juego.estado}
        </p>
        <p>
          <strong>Puntuación:</strong> {juego.puntuacion}/10
        </p>

        <div className="botones">
          <button
            className="btn editar"
            onClick={() => setJuegoEditando(juego)}
          >
            Editar
          </button>

          <button
            className="btn eliminar"
            onClick={() => eliminarJuego(juego.id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

/*
memo:
Evita que este componente se vuelva a renderizar
si las props (juego, funciones) no cambian.
*/
export default memo(ItemJuego);
