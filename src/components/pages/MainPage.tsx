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
    <div className="bg-black text-white min-h-screen px-10 py-24">

      <div className="flex justify-center p-10">

        <h1 className="text-5xl font-extrabold tracking-wide text-center">
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
        "
      >
        Discover legendary fighters, AI-powered battle companions,
        and elite Pokémon built for the arena.
      </p>

      {loading ? (

        <div className="flex justify-center mt-20">
          <h2 className="text-2xl animate-pulse">
            Loading Pokémon...
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

          {pokemons.map((pokemon) => (

            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
            />

          ))}

        </div>

      )}

    </div>
  );
};