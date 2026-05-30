import { useState, useEffect } from "react";
import { Search, ArrowRight, AlertCircle } from "lucide-react";
// Make sure this path matches your folder structure
import { getPokemonList, getPokemonbyName } from "../../api/pokemonapi";
import { PokemonCard } from "../cards/PokemonCard";
import { SearchedPokemonCard } from "../cards/SearchedPokemonCard";

export const SearchPokemon = () => {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [initialPokemons, setInitialPokemons] = useState<any[]>([]);
  const [displayedPokemons, setDisplayedPokemons] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const popularPokemon = [
    "pikachu",
    "charizard",
    "bulbasaur",
    "squirtle",
    "gengar",
    "mewtwo"
  ];
  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true);
        const listData = await getPokemonList(); 
        
        const detailedData = await Promise.all(
          listData.results.map((pokemon: any) =>
            getPokemonbyName(pokemon.name)
          )
        );
        
        setInitialPokemons(detailedData);
        setDisplayedPokemons(detailedData);
      } catch (err) {
        console.error("Error fetching initial pokemon:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Restore the initial list immediately if the user clears the search box
  useEffect(() => {
    if (search.trim() === "" && initialPokemons.length > 0) {
      setDisplayedPokemons(initialPokemons);
      setError(false);
    }
  }, [search, initialPokemons]);

  const handleSearch = async (queryToSearch: string) => {
    const query = queryToSearch.trim().toLowerCase();
    
    if (!query) {
      setDisplayedPokemons(initialPokemons);
      setError(false);
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const pokemonData = await getPokemonbyName(query);
      setDisplayedPokemons([pokemonData]);
    } catch (err) {
      console.error("Pokemon not found", err);
      setDisplayedPokemons([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(search);
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-green-300 to-yellow-200 pt-32 pb-20 px-4 md:px-8 flex flex-col items-center gap-16 relative z-0 selection:bg-red-500 selection:text-white">
      
      {/* Background Pokeball Watermark */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] border-[30px] border-white/20 rounded-full pointer-events-none -z-10 flex items-center justify-center">
        <div className="w-full h-[30px] bg-white/20 absolute"></div>
        <div className="w-48 h-48 border-[30px] border-white/20 bg-transparent rounded-full z-10"></div>
      </div>

      {/* ========================================================= */}
      {/* DAYTIME SEARCH AREA (Vibrant, Thick Borders) */}
      {/* ========================================================= */}
      <div className="relative z-10 w-full max-w-5xl bg-white border-4 border-slate-900 rounded-[2.5rem] p-8 md:p-14 shadow-[16px_16px_0px_rgba(0,0,0,0.8)] text-center flex flex-col gap-6 transition-all duration-500">
        
        {/* Card Header Lights */}
        <div className="absolute top-6 left-8 flex gap-3">
          <div className="w-5 h-5 bg-red-500 border-2 border-slate-900 rounded-full shadow-inner animate-pulse"></div>
          <div className="w-5 h-5 bg-yellow-400 border-2 border-slate-900 rounded-full shadow-inner"></div>
          <div className="w-5 h-5 bg-green-500 border-2 border-slate-900 rounded-full shadow-inner"></div>
        </div>

        <div className="flex flex-col gap-4 pt-6">
          <p className="text-slate-500 tracking-[0.3em] text-xl font-bold">
            POKÉDEX DATABASE
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-slate-800 leading-none tracking-wide">
            SEARCH <span className="text-red-500 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.8)]">POKÉMON</span>
          </h1>
        </div>

        {/* Input & Button Group */}
        <div className="flex flex-col md:flex-row gap-6 pt-6">
          <div className="relative flex-1 group">
            <Search
              size={32}
              strokeWidth={3}
              className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isFocused ? 'text-red-500' : 'text-slate-400'}`}
            />
            <input
              type="text"
              placeholder="Enter Pokémon name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="
                w-full bg-slate-100 border-4 border-slate-900 rounded-2xl py-6 pl-20 pr-6 text-2xl md:text-3xl text-slate-800 placeholder-slate-400 outline-none transition-all duration-300 shadow-[inset_0px_6px_0px_rgba(0,0,0,0.05)] focus:bg-white focus:-translate-y-1 focus:shadow-[6px_6px_0px_rgba(0,0,0,0.8)]
              "
            />
          </div>

          <button
            onClick={() => handleSearch(search)}
            className="
              bg-yellow-400 border-4 border-slate-900 text-slate-900 px-12 py-6 md:py-0 rounded-2xl text-2xl md:text-3xl tracking-wider shadow-[6px_6px_0px_rgba(0,0,0,0.8)] hover:-translate-y-1 hover:shadow-[10px_10px_0px_rgba(0,0,0,0.9)] hover:bg-yellow-300 active:translate-y-1 active:shadow-[2px_2px_0px_rgba(0,0,0,0.8)] transition-all flex items-center justify-center gap-3
            "
          >
            SEARCH
            <ArrowRight size={28} strokeWidth={3} />
          </button>
        </div>

        {/* Popular Searches */}
        <div className="flex flex-col items-center gap-6 pt-8 bg-slate-50 border-4 border-slate-900 rounded-3xl p-8 mt-4">
          <p className="text-slate-500 text-xl md:text-2xl tracking-widest">POPULAR SEARCHES</p>
          <div className="flex flex-wrap justify-center gap-4">
            {popularPokemon.map((pokemonName) => (
              <button
                key={pokemonName}
                onClick={() => {
                  setSearch(pokemonName);
                  handleSearch(pokemonName);
                }}
                className="
                  bg-white border-4 border-slate-900 px-6 py-3 rounded-full text-xl md:text-2xl text-slate-700 shadow-[4px_4px_0px_rgba(0,0,0,0.8)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.9)] hover:bg-red-500 hover:text-white active:translate-y-0 active:shadow-[2px_2px_0px_rgba(0,0,0,0.8)] transition-all tracking-wide capitalize
                "
              >
                {pokemonName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* DARK RESULTS AREA (Inner Screen Concept) */}
      {/* ========================================================= */}
      <div className="relative z-10 w-full max-w-[95vw] 2xl:max-w-[1600px] bg-black border-4 border-green-500 rounded-[2.5rem] p-8 md:p-12 shadow-[16px_16px_0px_rgba(0,0,0,0.8)] flex flex-col items-center min-h-[50vh]">
        
        {/* Screen Header indicator */}
        <div className="flex items-center gap-4 border-b-4 border-green-800 pb-4 w-full justify-center">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
            <p className="text-slate-400 text-2xl tracking-[0.2em]">SYSTEM_OUTPUT</p>
        </div>

        <div className="w-full pt-10 flex justify-center">
            {loading ? (
              // Themed Loading State for Dark UI
              <div className="flex flex-col items-center gap-6 py-12 animate-pulse">
                <div className="w-20 h-20 border-8 border-green-400 border-t-red-500 rounded-full animate-spin shadow-[0_0_20px_#ef4444]"></div>
                <h2 className="text-3xl text-red-500 tracking-widest drop-shadow-[0_0_8px_#ef4444]">ACCESSING NETWORK...</h2>
              </div>
            ) : error ? (
              // Error State for Dark UI
              <div className="flex flex-col items-center gap-6 py-12 text-slate-400 text-center">
                <AlertCircle size={80} className="text-red-500 opacity-90 drop-shadow-[0_0_15px_#ef4444]" />
                <p className="text-4xl text-white tracking-wide">NO POKÉMON FOUND</p>
                <p className="text-2xl">Verify the spelling or search using a valid National Pokédex ID number.</p>
              </div>
            ) : (
              // >>> CONDITIONAL RENDERING: Detailed Card vs Grid <<<
              search.trim() !== "" && displayedPokemons.length === 1 ? (
                // Show detailed card if exactly one pokemon is searched
                <SearchedPokemonCard 
  pokemon={displayedPokemons[0]} 
  onEvolutionClick={(clickedName) => {
    setSearch(clickedName); // Update the input field text
    handleSearch(clickedName); // Trigger the API fetch!
  }} 
/>
              ) : (
                // Show grid for the default 30 limit list
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                  {displayedPokemons.map((pokemon) => (
                    <PokemonCard key={pokemon.id || pokemon.name} pokemon={pokemon} />
                  ))}
                </div>
              )
            )}
        </div>

      </div>
    </div>
  );
};
