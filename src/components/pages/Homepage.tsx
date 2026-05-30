import { useEffect, useState } from "react";
import bg from "../../assets/pokemon_bg.webp";
import { MainPage } from "./MainPage";
import { Link } from "react-router-dom";

export const Homepage = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = bg;
    image.onload = () => setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-yellow-400 animate-pulse">
          Pokédex AI
        </h1>

        <p className="mt-4 text-gray-400">
          Loading Pokémon Universe...
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className="
        min-h-screen
        relative
        flex
        items-center
        px-16
        overflow-hidden
      "
      >
        <img
          src={bg}
          alt="Pokemon Background"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
          "
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div
          className="
          relative
          z-10
          max-w-3xl
          text-white
        "
        >
          <h1
            className="
            text-7xl
            font-extrabold
            leading-tight
            drop-shadow-2xl
          "
          >
            Enter The
            <span className="text-yellow-400"> Pokémon </span>
            AI Arena
          </h1>

          <p
            className="
            mt-6
            text-xl
            text-gray-200
            leading-relaxed
          "
          >
            Battle with intelligent Pokémon strategies,
            explore AI-powered encounters,
            and experience a futuristic Pokédex universe.
          </p>

          <div className="flex gap-6 mt-10">
            <Link to="/pokemons">
              <button
                className="
                px-8 py-4
                rounded-3xl
                bg-cyan-500/80
                backdrop-blur-md
                hover:bg-cyan-400
                hover:scale-110
                transition-all
                duration-300
                text-lg
                font-semibold
                shadow-2xl
              "
              >
                Start Exploring
              </button>
            </Link>

            <Link to='/about'>
                   <button
              className="
              px-8 py-4
              rounded-3xl
              border
              border-white/30
              bg-white/10
              backdrop-blur-md
              hover:bg-white/20
              hover:scale-110
              transition-all
              duration-300
              text-lg
              font-semibold
            "
            >
              Learn More
            </button>
            </Link>
           
          </div>
        </div>

        <div
          className="
          absolute
          bottom-0
          left-0
          w-full
          h-40
          bg-gradient-to-b
          from-transparent
          to-black
        "
        ></div>
      </div>

      <div>
        <MainPage />
      </div>
    </>
  );
};