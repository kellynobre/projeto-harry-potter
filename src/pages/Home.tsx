// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Character } from "../types/character";


const Home: React.FC = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const res = await fetch("https://hp-api.onrender.com/api/characters");
        const data: Character[] = await res.json();
        const random = data[Math.floor(Math.random() * data.length)];
        setCharacter(random);
      } catch (err) {
        console.error(err); //mensagem de erro
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, []);

    if (loading) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center bg-black text-white font-serif">
        <img
          src="/img/logo-harry-potter.png"
          alt="Carregando..."
          className="w-24 h-24 mb-4 animate-spin"
        />
        <p className="text-lg">Carregando personagem...</p>
      </div>
    );
  }

 return (
 <div className="relative w-full h-full bg-black py-[120px]">
  <div className="container flex flex-col lg:flex-row lg:justify-between gap-[50px] items-center overflow-hidden">
    
  
    {/* Lado esquerdo - Texto e opções */}
    <div className="z-10 flex flex-col gap-[2rem] justify-center items-center">
        
        <div className="flex flex-col gap-[10px] items-center text-center">
        <h1 className="text-[50px] md:text-[30px] text-white">Harry Potter</h1>
        <h2 className="text-[40px] text-yellow-400 ">Mischief Managed</h2>
        <p className="text-[20px] max-w-[400px] text-white">
          Explore personagens, feitiços e descubra seus favoritos do mundo mágico.
        </p>
        </div>

      {/* Destaque do personagem 
      {character && (
        <div className="bg-black bg-opacity-60 backdrop-blur-md rounded-xl p-6 mb-8 inline-block transform transition-transform hover:scale-105 shadow-2xl">
          <h3 className="text-2xl font-semibold mb-2">{character.name}</h3>
          {character.house && (
            <p className="mb-1">Casa: <span className="">{character.house}</span></p>
          )}
          {character.species && (
            <p className="mb-1">Espécie: <span className="">{character.species}</span></p>
          )}
          {character.alive !== undefined && (
            <p className="mb-1">Status: <span className="">{character.alive ? "Vivo" : "Morto"}</span></p>
          )}
        </div>
      )} */}

      {/* Botões */}
      <div className="flex gap-[20px] justify-center md:justify-start flex-wrap">
        <button
          className="bg-white text-black  px-6 py-3 rounded-lg shadow-lg hover:!bg-yellow-400  hover:!border-yellow-400 hover:scale-110 hover:shadow-2xl transition-transform duration-200"
          onClick={() => navigate("/characters")}
        >
          Personagens
        </button>
        <button
          className="bg-white text-black  px-6 py-3 rounded-lg shadow-lg hover:!bg-yellow-400  hover:!border-yellow-400 hover:scale-110 hover:shadow-2xl transition-transform duration-200"
          onClick={() => navigate("/spells")}
        >
          Feitiços
        </button>
      </div>
    </div>

      {/* Lado direito */}
      <div className="md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
        <img
          src="/harry-potter.gif"
          alt="Harry Potter"
          className="rounded-xl shadow-2xl max-h-[70vh] border-4 border-yellow-400"
        />
      </div>

    {/* Partículas mágicas */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="animate-pulse-slow bg-white w-1 h-1 rounded-full absolute top-10 left-20"></div>
      <div className="animate-pulse-slow bg-white w-1 h-1 rounded-full absolute top-40 left-80"></div>
      <div className="animate-pulse-slow bg-white w-1 h-1 rounded-full absolute top-60 left-10"></div>
      <div className="animate-pulse-slow bg-white w-1 h-1 rounded-full absolute top-80 left-60"></div>
      <div className="animate-pulse-slow bg-white w-1 h-1 rounded-full absolute top-20 left-70"></div>
    </div>
  </div>
  </div>
);
};

export default Home;