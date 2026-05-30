import { useState, useEffect, useRef } from "react";
import { Play, Sparkles, Activity, Shield, Zap } from "lucide-react";
import { api } from "../../api/axios"; 

export const SearchedPokemonCard = ({ 
  pokemon, 
  onEvolutionClick 
}: { 
  pokemon: any; 
  onEvolutionClick?: (name: string) => void;
}) => {
  const [flavorText, setFlavorText] = useState("");
  const [evolutionChain, setEvolutionChain] = useState<string[]>([]);
  const [loadingExtras, setLoadingExtras] = useState(true);
  const [isShiny, setIsShiny] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsShiny(false);
    
    const fetchDeepData = async () => {
      setLoadingExtras(true);
      try {
        const speciesRes = await api.get(`/pokemon-species/${pokemon.id}`);
        const speciesData = speciesRes.data;

        const englishEntry = speciesData.flavor_text_entries.find(
          (entry: any) => entry.language.name === "en"
        );
        setFlavorText(
          englishEntry ? englishEntry.flavor_text.replace(/\f|\n/g, " ") : "No historical records found."
        );

        const evoUrlParts = speciesData.evolution_chain.url.split("/");
        const evoId = evoUrlParts[evoUrlParts.length - 2];
        
        const evoRes = await api.get(`/evolution-chain/${evoId}`);
        const evoData = evoRes.data;

        const extractEvolutions = (chainNode: any): string[] => {
          let evos = [chainNode.species.name];
          chainNode.evolves_to.forEach((nextNode: any) => {
            evos = [...evos, ...extractEvolutions(nextNode)];
          });
          return evos;
        };

        setEvolutionChain(extractEvolutions(evoData.chain));
      } catch (err) {
        console.error("Failed to fetch deep pokemon data", err);
        setFlavorText("Data corrupted. Cannot load records.");
      } finally {
        setLoadingExtras(false);
      }
    };

    if (pokemon?.id) {
      fetchDeepData();
    }
  }, [pokemon]);

  const playCry = () => {
    if (pokemon.cries?.latest) {
      if (!audioRef.current || audioRef.current.src !== pokemon.cries.latest) {
        audioRef.current = new Audio(pokemon.cries.latest);
      }
      audioRef.current.volume = 0.5;
      audioRef.current.play();
    }
  };

  const formatStatName = (name: string) => {
    const statMap: Record<string, string> = {
      "hp": "HP", "attack": "ATK", "defense": "DEF", 
      "special-attack": "SP.ATK", "special-defense": "SP.DEF", "speed": "SPD"
    };
    return statMap[name] || name.toUpperCase();
  };

  return (
    // MAIN GLASS CONTAINER
    // Uses backdrop-blur, semi-transparent background, and a subtle bright border
    <div className="relative w-full max-w-5xl bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 md:p-10 flex flex-col gap-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
      
      {/* Ambient Glass Glows (Behind content) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-500/20 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* TOP SECTION: Visuals & Core Data */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-stretch border-b border-white/10 pb-8 relative z-10">
        
        {/* Left: Interactive Image */}
        <div className="flex flex-col gap-4 items-center w-full md:w-1/3">
          
          {/* Glass Image Circle */}
          <div className="w-56 h-56 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center relative overflow-hidden border border-white/20 shadow-[inset_0_4px_20px_rgba(255,255,255,0.05)] group">
            <img 
              src={isShiny 
                ? (pokemon.sprites?.other["official-artwork"]?.front_shiny || pokemon.sprites?.front_shiny) 
                : (pokemon.sprites?.other["official-artwork"]?.front_default || pokemon.sprites?.front_default)} 
              alt={pokemon.name}
              className="w-48 h-48 object-contain z-10 hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            />
            {/* Soft inner pulse */}
            <div className="absolute w-full h-full bg-gradient-to-br from-green-400/10 to-transparent animate-pulse rounded-full z-0"></div>
          </div>
          
          {/* Audio & Shiny Controls (Glass Buttons) */}
          <div className="flex gap-4 w-full justify-center">
            <button 
              onClick={playCry}
              className="bg-white/5 hover:bg-white/20 backdrop-blur-md border border-white/10 text-green-400 hover:text-green-300 p-3 rounded-xl transition-all flex gap-2 items-center text-sm font-bold tracking-widest shadow-lg"
              title="Play Data Cry"
            >
              <Play size={18} /> CRY
            </button>
            <button 
              onClick={() => setIsShiny(!isShiny)}
              className={`${isShiny ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50' : 'bg-white/5 text-yellow-500 border-white/10'} hover:bg-yellow-500/30 backdrop-blur-md border p-3 rounded-xl transition-all flex gap-2 items-center text-sm font-bold tracking-widest shadow-lg`}
            >
              <Sparkles size={18} /> SHINY
            </button>
          </div>
        </div>

        {/* Right: Core Metrics */}
        <div className="flex flex-col gap-4 flex-1 w-full justify-center">
          <div className="flex items-end gap-4 justify-between">
            <h2 className="text-5xl text-white capitalize font-black tracking-widest drop-shadow-md">
              {pokemon.name}
            </h2>
            <span className="text-white/50 font-mono text-2xl tracking-widest">
              #{String(pokemon.id).padStart(3, '0')}
            </span>
          </div>
          
          {/* Type Badges */}
          <div className="flex flex-wrap gap-3 pt-2">
            {pokemon.types?.map((t: any) => (
              <span key={t.type.name} className="px-5 py-2 bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-full text-sm uppercase tracking-widest font-bold shadow-sm">
                {t.type.name}
              </span>
            ))}
          </div>

          {/* Specs & Abilities (Glass Panels) */}
          <div className="grid grid-cols-2 gap-4 pt-4 text-slate-200">
            <div className="bg-black/20 backdrop-blur-md p-5 rounded-2xl border border-white/5 flex flex-col gap-1 shadow-inner">
              <span className="text-green-400/80 text-xs tracking-widest font-mono uppercase">Specs</span>
              <span className="text-xl font-bold tracking-wide">
                {(pokemon.height / 10).toFixed(1)}m / {(pokemon.weight / 10).toFixed(1)}kg
              </span>
            </div>
            <div className="bg-black/20 backdrop-blur-md p-5 rounded-2xl border border-white/5 flex flex-col gap-1 shadow-inner">
              <span className="text-green-400/80 text-xs tracking-widest font-mono uppercase">Abilities</span>
              <div className="flex flex-col gap-1">
                {pokemon.abilities?.map((a: any) => (
                  <span key={a.ability.name} className={`text-sm tracking-wide capitalize ${a.is_hidden ? 'text-yellow-400/90' : 'text-white'}`}>
                    {a.ability.name} {a.is_hidden && '(Hidden)'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Stats, Lore, Evolutions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        
        {/* Base Stats Radar */}
        <div className="bg-black/20 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col gap-6 shadow-inner">
          <p className="text-white/70 text-sm tracking-widest uppercase flex gap-2 items-center font-bold">
            <Activity size={18} className="text-green-400"/> Base Statistics
          </p>
          <div className="flex flex-col gap-4 w-full">
            {pokemon.stats?.map((s: any) => (
              <div key={s.stat.name} className="flex items-center gap-4 w-full">
                <span className="w-16 text-white/50 text-xs font-mono tracking-widest">{formatStatName(s.stat.name)}</span>
                <span className="w-8 text-white font-bold text-right">{s.base_stat}</span>
                <div className="flex-1 h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
                    style={{ width: `${Math.min((s.base_stat / 255) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deep Lore & Clickable Evolutions */}
        <div className="flex flex-col gap-6">
          {loadingExtras ? (
            <div className="text-white/50 animate-pulse text-lg tracking-widest h-full flex items-center justify-center border border-white/5 rounded-3xl bg-black/20 p-6 backdrop-blur-md">
              DECRYPTING DATA...
            </div>
          ) : (
            <>
              {/* Lore Glass Box */}
              <div className="bg-black/20 backdrop-blur-md p-6 rounded-3xl border border-white/5 flex-1 shadow-inner flex flex-col gap-3">
                <p className="text-white/70 text-sm tracking-widest uppercase font-bold flex items-center gap-2">
                  <Shield size={18} className="text-blue-400"/> Subject Lore
                </p>
                <p className="text-slate-300 text-lg leading-relaxed tracking-wide italic">
                  "{flavorText}"
                </p>
              </div>

              {/* Evolution Chain Glass Box */}
              <div className="bg-black/20 backdrop-blur-md p-6 rounded-3xl border border-white/5 shadow-inner flex flex-col gap-4">
                <p className="text-white/70 text-sm tracking-widest uppercase font-bold flex gap-2 items-center">
                  <Zap size={18} className="text-yellow-400"/> Evolution Path
                </p>
                
                <div className="flex flex-wrap items-center gap-3">
                  {evolutionChain.map((evoName, index) => (
                    <div key={`${evoName}-${index}`} className="flex items-center gap-3">
                      <button
                        onClick={() => onEvolutionClick && onEvolutionClick(evoName)}
                        disabled={evoName === pokemon.name || !onEvolutionClick}
                        className={`
                          px-5 py-2 rounded-xl text-sm md:text-base uppercase tracking-wider font-bold transition-all backdrop-blur-md
                          ${evoName === pokemon.name 
                            ? "bg-white/20 text-white border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                            : "bg-white/5 text-white/60 border border-white/10 hover:border-white/30 hover:text-white hover:bg-white/10"
                          }
                        `}
                      >
                        {evoName}
                      </button>
                      {index < evolutionChain.length - 1 && (
                        <span className="text-white/30 font-black">➔</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};