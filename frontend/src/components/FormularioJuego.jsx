import { useEffect, useState } from "react";

function FormularioJuego({
  agregarJuego,
  actualizarJuego,
  juegoEditando,
  setJuegoEditando,
}) {
  const [formData, setFormData] = useState({
    titulo: "",
    plataforma: "",
    genero: "",
    estado: "Pendiente",
    puntuacion: "",
    imagen: "",
  });

  useEffect(() => {
    if (juegoEditando) {
      setFormData(juegoEditando);
    } else {
      setFormData({
        titulo: "",
        plataforma: "",
        genero: "",
        estado: "Pendiente",
        puntuacion: "",
        imagen: "",
      });
    }
  }, [juegoEditando]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const juegoData = {
      ...formData,
      puntuacion: Number(formData.puntuacion),
    };

    if (juegoEditando) {
      actualizarJuego(juegoEditando.id, juegoData);
    } else {
      agregarJuego(juegoData);
    }

    setFormData({
      titulo: "",
      plataforma: "",
      genero: "",
      estado: "Pendiente",
      puntuacion: "",
      imagen: "",
    });
  };

  const cancelarEdicion = () => {
    setJuegoEditando(null);
    setFormData({
      titulo: "",
      plataforma: "",
      genero: "",
      estado: "Pendiente",
      puntuacion: "",
      imagen: "",
    });
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>{juegoEditando ? "Editar videojuego" : "Agregar videojuego"}</h2>

      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={formData.titulo}
        onChange={handleChange}
      />

      <input
        type="text"
        name="plataforma"
        placeholder="Plataforma"
        value={formData.plataforma}
        onChange={handleChange}
      />

      <input
        type="text"
        name="genero"
        placeholder="Género"
        value={formData.genero}
        onChange={handleChange}
      />

      <select name="estado" value={formData.estado} onChange={handleChange}>
        <option value="Pendiente">Pendiente</option>
        <option value="Jugando">Jugando</option>
        <option value="Terminado">Terminado</option>
      </select>

      <input
        type="number"
        name="puntuacion"
        placeholder="Puntuación (1 a 10)"
        value={formData.puntuacion}
        onChange={handleChange}
        min="1"
        max="10"
      />

      <input
        type="text"
        name="imagen"
        placeholder="URL de imagen"
        value={formData.imagen}
        onChange={handleChange}
      />

      <button type="submit">{juegoEditando ? "Actualizar" : "Agregar"}</button>

      {juegoEditando && (
        <button type="button" onClick={cancelarEdicion}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default FormularioJuego;
