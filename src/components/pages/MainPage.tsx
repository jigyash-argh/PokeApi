import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { PokemonCard } from "../cards/PokemonCard";

export const MainPage = () => {
  // Added <any[]> to resolve the TypeScript build error
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // The iconic Pokémon from the beginning of the journey
  const classicEncounters = [
    "pikachu",
    "bulbasaur",
    "charmander",
    "squirtle",
    "butterfree",
    "pidgeotto",
    "togepi",
    "jigglypuff",
    "snorlax"
  ];

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        // Fetch detailed data for each specific Pokémon in our list
        const detailedResponse = await Promise.all(
          classicEncounters.map((name) => api.get(`/pokemon/${name}`))
        );

        setPokemons(
          detailedResponse.map((response) => response.data)
        );

      } catch (error) {
        console.error("Error fetching classic Pokémon:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen px-10 py-24">
      
      <div className="flex justify-center p-10">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide text-center">
          Classic <span className="text-yellow-400">Encounters</span>
        </h1>
      </div>

      <p className="text-center text-gray-400 text-xl mt-4 max-w-3xl mx-auto leading-relaxed">
        Relive the magic of the early journey. Discover the iconic companions, familiar faces, and unforgettable rivals from the beginning of the adventure.
      </p>

      {loading ? (
        <div className="flex justify-center mt-20">
          <h2 className="text-2xl text-yellow-400 animate-pulse font-bold tracking-widest uppercase">
            Accessing Pokédex...
          </h2>
        </div>
      ) : (
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
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