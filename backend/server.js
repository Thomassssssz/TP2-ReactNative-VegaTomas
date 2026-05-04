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
      "https://static.wikia.nocookie.net/thelastofus/images/8/85/Portada_Parte_II_limpia.jpeg/revision/latest?cb=20211209014334&path-prefix=es",
  },
  {
    id: 3,
    titulo: "Days Gone",
    plataforma: "PS4",
    genero: "Zombies, Aventura",
    estado: "Jugando",
    puntuacion: 9,
    imagen:
      "https://imgproxy.eneba.games/HoaxYHRm2y_YKu7YBRY2Q7fN6Wbqf7huXBPvaDTXd60/rs:fit:300/ar:1/czM6Ly9wcm9kdWN0/cy5lbmViYS5nYW1l/cy9wcm9kdWN0cy9i/d0Y5NlM2SW1iTC00/bDlnUnlvOE52ZC1v/V2NiR0l0V3lmYU1D/XzBBN3NrLmpwZWc",
  },
  {
    id: 4,
    titulo: "Rocket ;eague",
    plataforma: "PS4",
    genero: "Deporte",
    estado: "Jugando",
    puntuacion: 8,
    imagen:
      "https://upload.wikimedia.org/wikipedia/commons/e/e0/Rocket_League_coverart.jpg",
  },
  {
    id: 5,
    titulo: "The Forest",
    plataforma: "PS4",
    genero: "Aventura",
    estado: "Jugando",
    puntuacion: 8,
    imagen:
      "https://mundosteam.shop/wp-content/uploads/2024/07/Diseno-sin-titulo-2024-07-29T233932.863.png",
  },
  {
    id: 6,
    titulo: "World War Z: Aftertmath",
    plataforma: "PS5",
    genero: "Acción",
    estado: "Terminado",
    puntuacion: 10,
    imagen:
      "https://store-images.s-microsoft.com/image/apps.52097.14124816078460443.a6dec9dc-b4f7-4744-94f3-470e02e1dd63.eda5ab58-b829-43e1-9e83-53d108036961",
  },
  {
    id: 7,
    titulo: "Detroit: Become Human",
    plataforma: "PS4",
    genero: "Historia",
    estado: "Terminado",
    puntuacion: 7,
    imagen:
      "https://acdn-us.mitiendanube.com/stores/004/491/480/products/diseno-sin-titulo-92-1-014bdff4e5efee45e617223094349622-1024-1024.webp",
  },
  {
    id: 8,
    titulo: "Resident Evil Village",
    plataforma: "PS5",
    genero: "Terror",
    estado: "Terminado",
    puntuacion: 10,
    imagen:
      "https://image.api.playstation.com/vulcan/ap/rnd/202101/0812/FkzwjnJknkrFlozkTdeQBMub.png",
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
