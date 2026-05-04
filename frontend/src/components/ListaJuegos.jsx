import { useCallback, useMemo } from "react";
import ItemJuego from "./ItemJuego";

function ListaJuegos({ juegos, eliminarJuego, setJuegoEditando }) {
  /*
  useCallback:
  Guarda la función eliminar para que no se cree de nuevo
  cada vez que se renderiza ListaJuegos.
  */
  const handleEliminar = useCallback(
    (id) => {
      eliminarJuego(id);
    },
    [eliminarJuego],
  );

  /*
  useCallback:
  Guarda la función editar para que no se cree de nuevo
  en cada render.
  */
  const handleEditar = useCallback(
    (juego) => {
      setJuegoEditando(juego);
    },
    [setJuegoEditando],
  );

  /*
  useMemo:
  Calcula el total de juegos solo cuando cambia la lista de juegos.
  */
  const totalJuegos = useMemo(() => {
    return juegos.length;
  }, [juegos]);

  /*
  useMemo:
  Calcula el promedio de puntuación solo cuando cambia la lista de juegos.
  */
  const promedioPuntuacion = useMemo(() => {
    if (juegos.length === 0) return 0;

    const suma = juegos.reduce(
      (acumulador, juego) => acumulador + Number(juego.puntuacion),
      0,
    );

    return suma / juegos.length;
  }, [juegos]);

  if (juegos.length === 0) {
    return <p>No hay videojuegos para mostrar.</p>;
  }

  return (
    <>
      <div className="estadisticas">
        <p>Total de videojuegos: {totalJuegos}</p>
        <p>Promedio de puntuación: {promedioPuntuacion.toFixed(2)}/10</p>
      </div>

      <div className="lista">
        {juegos.map((juego) => (
          <ItemJuego
            key={juego.id}
            juego={juego}
            eliminarJuego={handleEliminar}
            setJuegoEditando={handleEditar}
          />
        ))}
      </div>
    </>
  );
}

export default ListaJuegos;
