import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { PokemonCard } from "../cards/PokemonCard";

export const MainPage = () => {

  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    (async () => {

      try {

        const listResponse = await api.get(
          "/pokemon?limit=6"
        );

        const detailedResponse = await Promise.all(

          listResponse.data.results.map(
            (pokemon) =>
              api.get(`/pokemon/${pokemon.name}`)
          )

        );

        setPokemons(

          detailedResponse.map(
            (pokemon) => pokemon.data
          )

        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    })();

  }, []);

  return (
    <div
      className="
      relative
      bg-black
      text-white
      min-h-screen
      px-10
      py-24
      overflow-hidden
      "
    >

      <div
        className="
        absolute
        top-20
        left-1/2
        -translate-x-1/2
        w-[500px]
        h-[500px]
        rounded-full
        bg-yellow-500/10
        blur-3xl
        animate-pulse
        "
      />

      <div className="relative z-10">

        <div className="flex justify-center p-10">

          <h1
            className="
            text-5xl
            font-extrabold
            tracking-wide
            text-center
            animate-[fadeInUp_1s_ease-out]
            "
          >
            Meet Our Star
            <span className="text-yellow-400">
              {" "}Pokémon
            </span>
          </h1>

        </div>

        <p
          className="
          text-center
          text-gray-400
          text-xl
          mt-6
          max-w-3xl
          mx-auto
          animate-[fadeInUp_1.3s_ease-out]
          "
        >
          Discover legendary fighters, AI-powered battle companions,
          and elite Pokémon built for the arena.
        </p>

        {loading ? (

          <div
            className="
            flex
            flex-col
            items-center
            justify-center
            mt-24
            gap-6
            "
          >

            <div
              className="
              w-16
              h-16
              border-4
              border-yellow-400
              border-t-transparent
              rounded-full
              animate-spin
              "
            />

            <h2 className="text-2xl text-yellow-300">
              Summoning Pokémon...
            </h2>

          </div>

        ) : (

          <div
            className="
            mt-20
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-10
            "
          >

            {pokemons.map((pokemon, index) => (

              <div
                key={pokemon.id}
                style={{
                  animationDelay: `${index * 150}ms`
                }}
                className="
                opacity-0
                animate-[fadeInUp_0.8s_ease-out_forwards]
                "
              >

                <PokemonCard
                  pokemon={pokemon}
                />

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};