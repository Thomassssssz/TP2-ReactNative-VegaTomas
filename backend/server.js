const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let juegos = [
  {
    id: 1,
    titulo: "God of War Ragnarok",
    plataforma: "PS5",
    genero: "Acción",
    estado: "Terminado",
    puntuacion: 10,
    imagen:
      "https://upload.wikimedia.org/wikipedia/en/e/ee/God_of_War_Ragnar%C3%B6k_cover.jpg",
  },
  {
    id: 2,
    titulo: "The Last of Us Part II",
    plataforma: "PS4",
    genero: "Aventura",
    estado: "Jugando",
    puntuacion: 9,
    imagen:
      "https://upload.wikimedia.org/wikipedia/en/4/46/The_Last_of_Us_Part_II.png",
  },
];

// GET - listar todos
app.get("/juegos", (req, res) => {
  res.json(juegos);
});

// GET - obtener por id
app.get("/juegos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const juego = juegos.find((j) => j.id === id);

  if (!juego) {
    return res.status(404).json({ error: "Juego no encontrado" });
  }

  res.json(juego);
});

// POST - crear
app.post("/juegos", (req, res) => {
  const { titulo, plataforma, genero, estado, puntuacion, imagen } = req.body;

  if (
    !titulo ||
    !plataforma ||
    !genero ||
    !estado ||
    puntuacion === undefined
  ) {
    return res.status(400).json({
      error:
        "Los campos titulo, plataforma, genero, estado y puntuacion son obligatorios",
    });
  }

  const nuevoJuego = {
    id: juegos.length > 0 ? juegos[juegos.length - 1].id + 1 : 1,
    titulo,
    plataforma,
    genero,
    estado,
    puntuacion,
    imagen: imagen || "",
  };

  juegos.push(nuevoJuego);
  res.status(201).json(nuevoJuego);
});

// PUT - actualizar
app.put("/juegos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = juegos.findIndex((j) => j.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Juego no encontrado" });
  }

  const { titulo, plataforma, genero, estado, puntuacion, imagen } = req.body;

  if (
    !titulo ||
    !plataforma ||
    !genero ||
    !estado ||
    puntuacion === undefined
  ) {
    return res.status(400).json({
      error:
        "Los campos titulo, plataforma, genero, estado y puntuacion son obligatorios",
    });
  }

  juegos[index] = {
    id,
    titulo,
    plataforma,
    genero,
    estado,
    puntuacion,
    imagen: imagen || "",
  };

  res.json(juegos[index]);
});

// DELETE - eliminar
app.delete("/juegos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = juegos.findIndex((j) => j.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Juego no encontrado" });
  }

  const eliminado = juegos[index];
  juegos.splice(index, 1);

  res.json({ mensaje: "Juego eliminado correctamente", juego: eliminado });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
