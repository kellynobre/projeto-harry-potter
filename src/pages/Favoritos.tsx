import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFavoritos } from "../contexts/useFavoritos";

export default function Favoritos() {
  const { favoritos, toggleFavorito } = useFavoritos();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center bg-black text-white font-serif">
        <img
          src="/img/logo-harry-potter.png"
          alt="Carregando..."
          className="w-24 h-24 mb-4 animate-spin"
        />
        <p className="text-lg">Carregando favoritos...</p>
      </div>
    );
  }

  if (favoritos.length === 0) {
    return (
      <div className="w-full h-full h-screen bg-black py-[120px]">
      <div className="container flex flex-col justify-center items-center text-yellow-400 font-harry">
        <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">Favoritos</h2>
        <p className="mb-6 text-center text-lg">Nenhum personagem foi favoritado ainda.</p>
        <Link
          to="/characters"
          className="px-6 py-3 bg-yellow-400 text-black rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-transform"
        >
          Ver personagens
        </Link>
      </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full  bg-black py-[120px]">
      <div className="container">
        <h2 className="text-4xl text-yellow-400 text-center mb-8 drop-shadow-lg font-harry">Meus Favoritos</h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoritos.map((personagem) => (
            <li
              key={personagem.id}
              className="bg-black bg-opacity-70 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center shadow-[0_0_20px_rgba(255,215,0,0.5)] hover:shadow-[0_0_40px_rgba(255,215,0,0.7)] hover:scale-105 transform transition cursor-pointer"
            >
              {personagem.image && (
                <img
                  src={personagem.image}
                  alt={personagem.name}
                  className="w-28 h-28 object-cover rounded-full mb-3 border-4 border-yellow-400 shadow-md"
                />
              )}
              <h3 className="font-bold text-xl mb-1 text-yellow-400 drop-shadow-sm">{personagem.name}</h3>
              <p className="text-sm text-gray-300 mb-3">{personagem.house || "Sem casa"}</p>

              <div className="flex gap-4 w-full justify-center">
  <Link
    to={`/characters/${personagem.id}`}
    className="flex-1 px-4 py-2 bg-yellow-400 text-black rounded-xl shadow hover:bg-yellow-300 hover:scale-105 hover:shadow-2xl transition-transform flex justify-center items-center"
  >
    Detalhes
  </Link>

  <button
    onClick={() => toggleFavorito(personagem)}
    className="flex-1 px-4 py-2 !bg-red-600 hover:!border-red-600 text-white rounded-xl shadow hover:!bg-red-700 hover:scale-105 hover:shadow-2xl transition-transform flex justify-center items-center"
  >
    Remover
  </button>
</div>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
