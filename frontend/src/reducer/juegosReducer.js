export const juegosReducer = (state, action) => {
  switch (action.type) {
    case "CARGAR_JUEGOS":
      return action.payload;

    case "AGREGAR_JUEGO":
      return [...state, action.payload];

    case "EDITAR_JUEGO":
      return state.map((juego) =>
        juego.id === action.payload.id ? action.payload : juego,
      );

    case "ELIMINAR_JUEGO":
      return state.filter((juego) => juego.id !== action.payload);

    default:
      return state;
  }
};
