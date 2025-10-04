// src/components/Footer.tsx
import React from "react";


const Footer: React.FC = () => {
  return (
    <footer className="w-full h-full bg-black text-white relative overflow-hidden">
      {/* Partículas mágicas */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-pulse-slow bg-yellow-400 w-1 h-1 rounded-full absolute top-10 left-20"></div>
        <div className="animate-pulse-slow bg-yellow-400 w-1 h-1 rounded-full absolute top-40 left-80"></div>
        <div className="animate-pulse-slow bg-yellow-400 w-1 h-1 rounded-full absolute top-60 left-10"></div>
      </div>

      <div className="container flex justify-between text-center relative z-10">
        <p className="text-[12px] text-gray-300 mb-4">
          © {new Date().getFullYear()} Harry Potter. Todos os direitos reservados.
        </p>

        <p className="text-[12px]  text-gray-400 mb-6">
          Dados fornecidos pela API pública:{" "}
          <a
            className="underline hover:text-yellow-400 transition-colors"
            href="https://hp-api.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            hp-api.onrender.com
          </a>
        </p>

      </div>
    </footer>
  );
};

export default Footer;
