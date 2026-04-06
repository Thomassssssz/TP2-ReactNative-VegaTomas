function Buscador({ busqueda, setBusqueda }) {
  return (
    <div className="buscador">
      <input
        type="text"
        placeholder="Buscar por título o plataforma..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </div>
  );
}

export default Buscador;
