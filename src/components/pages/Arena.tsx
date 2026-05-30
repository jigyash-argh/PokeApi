import { useState } from "react";
import { Swords, Zap, Target, ArrowRight } from "lucide-react";
import charizardxy from "../../assets/charizardxy.png";
import { getPokemonbyName } from "../../api/pokemonapi";

export const Arena = () => {
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");

  const [pokemon1, setPokemon1] = useState<any>(null);
  const [pokemon2, setPokemon2] = useState<any>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState("");

  const handleLockIn1 = async () => {
    if (!search1) return;
    try {
      const data = await getPokemonbyName(search1.toLowerCase());
      setPokemon1(data);
      setAnalysis(null);
      setError("");
    } catch (err) {
      setError(`Could not find Pokémon: ${search1}`);
      setPokemon1(null);
    }
  };

  const handleLockIn2 = async () => {
    if (!search2) return;
    try {
      const data = await getPokemonbyName(search2.toLowerCase());
      setPokemon2(data);
      setAnalysis(null);
      setError("");
    } catch (err) {
      setError(`Could not find Pokémon: ${search2}`);
      setPokemon2(null);
    }
  };

  const getStat = (pokemon: any, statName: string) => {
    return pokemon.stats.find((s: any) => s.stat.name === statName)?.base_stat || 0;
  };

  const getBST = (pokemon: any) => {
    return pokemon.stats.reduce((sum: number, s: any) => sum + s.base_stat, 0);
  };

  const handleAnalyze = () => {
    if (!pokemon1 || !pokemon2) return;
    setIsAnalyzing(true);
    setAnalysis(null);

    setTimeout(() => {
      const p1BST = getBST(pokemon1);
      const p2BST = getBST(pokemon2);
      const p1Speed = getStat(pokemon1, "speed");
      const p2Speed = getStat(pokemon2, "speed");

      const p1Moves = pokemon1.moves.slice(0, 4).map((m: any) => m.move.name.replace("-", " "));
      const p2Moves = pokemon2.moves.slice(0, 4).map((m: any) => m.move.name.replace("-", " "));

      let winnerName = "";
      let reasoning = "";

      if (p1BST > p2BST + 50) {
        winnerName = pokemon1.name;
        reasoning = `Based on raw power, ${pokemon1.name} overwhelms the opponent with a Base Stat Total of ${p1BST} compared to ${p2BST}.`;
      } else if (p2BST > p1BST + 50) {
        winnerName = pokemon2.name;
        reasoning = `With a massive Base Stat advantage (${p2BST} vs ${p1BST}), ${pokemon2.name} is mathematically favored to dominate this matchup.`;
      } else {
        if (p1Speed > p2Speed) {
          winnerName = pokemon1.name;
          reasoning = `This is a highly contested match (BST ${p1BST} vs ${p2BST}). However, ${pokemon1.name} has superior speed (${p1Speed} vs ${p2Speed}), allowing it to strike first and secure the victory.`;
        } else if (p2Speed > p1Speed) {
          winnerName = pokemon2.name;
          reasoning = `A perfectly balanced fight in terms of overall stats. But ${pokemon2.name} holds the speed advantage (${p2Speed} vs ${p1Speed}), providing the critical initiative needed to win.`;
        } else {
          winnerName = "Draw";
          reasoning = `Incredible. Their overall power and speed are virtually identical. This matchup relies entirely on trainer strategy and move-set execution.`;
        }
      }

      setAnalysis({
        p1BST, p2BST,
        p1Speed, p2Speed,
        p1Moves, p2Moves,
        winnerName, reasoning
      });

      setIsAnalyzing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-200 font-sans w-full flex flex-col items-center pt-32 pb-20 px-4 md:px-8 relative z-0 selection:bg-blue-500 selection:text-white overflow-x-hidden">
      
      {/* Background Image - Opacity increased drastically to 40% for much better visibility */}
      <div 
        className="absolute inset-0 z-[-2] opacity-40 md:opacity-50"
        style={{
          backgroundImage: `url(${charizardxy})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      {/* Gradient Overlay - Adjusted to be more transparent in the middle so the image shows through clearly */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-zinc-950/40 to-black/90 z-[-1] pointer-events-none"></div>

      {/* Main Content Wrapper */}
      <div className="w-full max-w-[95vw] 2xl:max-w-[1600px] flex flex-col items-center gap-12 lg:gap-16">
        
        {/* Minimalist Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-md">
            Tactical <span className="text-blue-500">Analysis</span>
          </h1>
          <p className="text-zinc-300 text-base md:text-lg max-w-2xl drop-shadow-md font-medium">
            Evaluate statistical matchups and combat metrics between any two targets across the global database.
          </p>
        </div>

        {/* Setup Stage - Full Width Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 items-center">
          
          {/* Competitor 1 */}
          <div className="w-full bg-zinc-950/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 lg:p-10 flex flex-col gap-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Target 01"
                value={search1}
                onChange={(e) => setSearch1(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLockIn1()}
                className="w-full flex-1 bg-black/80 border border-zinc-700 rounded-xl px-5 py-3 text-base text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-zinc-500"
              />
              <button 
                onClick={handleLockIn1}
                className="bg-zinc-800 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-xl text-sm tracking-widest uppercase transition-colors shadow-lg"
              >
                Set
              </button>
            </div>

            {pokemon1 ? (
              <div className="flex flex-col items-center gap-6 animate-in fade-in duration-500">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl -z-10"></div>
                  <img 
                    src={pokemon1.sprites?.other["official-artwork"]?.front_default || pokemon1.sprites?.front_default} 
                    alt={pokemon1.name}
                    className="w-36 h-36 object-contain drop-shadow-xl"
                  />
                </div>
                <div className="flex flex-col items-center gap-3">
                  <h3 className="text-2xl font-semibold capitalize text-white tracking-wide">{pokemon1.name}</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {pokemon1.types.map((t:any) => (
                      <span key={t.type.name} className="px-3 py-1 bg-black/80 border border-zinc-700 text-zinc-300 rounded-md text-xs uppercase tracking-widest font-medium">
                        {t.type.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[240px] flex items-center justify-center border-2 border-dashed border-zinc-700 rounded-2xl bg-black/40">
                <span className="text-zinc-500 text-sm tracking-widest uppercase">Awaiting Target 01</span>
              </div>
            )}
          </div>

          {/* Action Center */}
          <div className="flex flex-col items-center gap-8 py-6 lg:py-0">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black border-2 border-zinc-700 text-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <Swords size={28} strokeWidth={1.5} />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={!pokemon1 || !pokemon2 || isAnalyzing}
              className={`
                flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm tracking-widest uppercase font-bold transition-all duration-300 shadow-xl
                ${pokemon1 && pokemon2 && !isAnalyzing 
                  ? "bg-blue-600 text-white hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:-translate-y-1" 
                  : "bg-zinc-900/80 text-zinc-500 border border-zinc-800 cursor-not-allowed backdrop-blur-md"
                }
              `}
            >
              {isAnalyzing ? (
                <><Zap size={18} className="animate-pulse" /> Processing</>
              ) : (
                <>Run Analysis <ArrowRight size={18} /></>
              )}
            </button>
          </div>

          {/* Competitor 2 */}
          <div className="w-full bg-zinc-950/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 lg:p-10 flex flex-col gap-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Target 02"
                value={search2}
                onChange={(e) => setSearch2(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLockIn2()}
                className="w-full flex-1 bg-black/80 border border-zinc-700 rounded-xl px-5 py-3 text-base text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-zinc-500"
              />
              <button 
                onClick={handleLockIn2}
                className="bg-zinc-800 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-xl text-sm tracking-widest uppercase transition-colors shadow-lg"
              >
                Set
              </button>
            </div>

            {pokemon2 ? (
              <div className="flex flex-col items-center gap-6 animate-in fade-in duration-500">
                <div className="relative w-40 h-40 flex items-center justify-center transform scale-x-[-1]">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl -z-10"></div>
                  <img 
                    src={pokemon2.sprites?.other["official-artwork"]?.front_default || pokemon2.sprites?.front_default} 
                    alt={pokemon2.name}
                    className="w-36 h-36 object-contain drop-shadow-xl"
                  />
                </div>
                <div className="flex flex-col items-center gap-3">
                  <h3 className="text-2xl font-semibold capitalize text-white tracking-wide">{pokemon2.name}</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {pokemon2.types.map((t:any) => (
                      <span key={t.type.name} className="px-3 py-1 bg-black/80 border border-zinc-700 text-zinc-300 rounded-md text-xs uppercase tracking-widest font-medium">
                        {t.type.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[240px] flex items-center justify-center border-2 border-dashed border-zinc-700 rounded-2xl bg-black/40">
                <span className="text-zinc-500 text-sm tracking-widest uppercase">Awaiting Target 02</span>
              </div>
            )}
          </div>

        </div>

        {error && (
          <div className="text-red-400 text-sm px-6 py-3 bg-red-950/50 border border-red-900 rounded-xl tracking-wide shadow-lg">
            {error}
          </div>
        )}

        {/* Analysis Report - Full Width */}
        {analysis && !isAnalyzing && (
          <div className="w-full bg-zinc-950/80 backdrop-blur-2xl border border-zinc-800 rounded-3xl p-8 md:p-12 flex flex-col gap-10 animate-in slide-in-from-bottom-8 fade-in duration-500 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-6">
              <Target size={20} className="text-blue-500" />
              <h2 className="text-xl font-semibold text-white tracking-wide">System Report</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* P1 Metrics */}
              <div className="bg-black/60 p-8 rounded-2xl border border-zinc-800 flex flex-col gap-8 shadow-inner">
                <h3 className="text-lg font-bold text-zinc-200 uppercase tracking-widest capitalize flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]"></div> {pokemon1.name}
                </h3>
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-center text-base border-b border-zinc-800/80 pb-3">
                    <span className="text-zinc-400">Base Stat Total</span>
                    <span className="font-bold text-blue-400 text-lg">{analysis.p1BST}</span>
                  </div>
                  <div className="flex justify-between items-center text-base border-b border-zinc-800/80 pb-3">
                    <span className="text-zinc-400">Speed Metric</span>
                    <span className="font-bold text-blue-400 text-lg">{analysis.p1Speed}</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">Move Pool Sample</span>
                    <div className="flex flex-wrap gap-2">
                      {analysis.p1Moves.map((m: string) => (
                        <span key={m} className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-md text-xs text-zinc-300 capitalize tracking-wide shadow-sm">{m}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* P2 Metrics */}
              <div className="bg-black/60 p-8 rounded-2xl border border-zinc-800 flex flex-col gap-8 shadow-inner">
                <h3 className="text-lg font-bold text-zinc-200 uppercase tracking-widest capitalize flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]"></div> {pokemon2.name}
                </h3>
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-center text-base border-b border-zinc-800/80 pb-3">
                    <span className="text-zinc-400">Base Stat Total</span>
                    <span className="font-bold text-blue-400 text-lg">{analysis.p2BST}</span>
                  </div>
                  <div className="flex justify-between items-center text-base border-b border-zinc-800/80 pb-3">
                    <span className="text-zinc-400">Speed Metric</span>
                    <span className="font-bold text-blue-400 text-lg">{analysis.p2Speed}</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">Move Pool Sample</span>
                    <div className="flex flex-wrap gap-2">
                      {analysis.p2Moves.map((m: string) => (
                        <span key={m} className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-md text-xs text-zinc-300 capitalize tracking-wide shadow-sm">{m}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Final Verdict */}
            <div className="flex flex-col gap-4 bg-blue-900/10 border border-blue-900/40 p-8 rounded-2xl shadow-[inset_0_0_20px_rgba(30,58,138,0.2)]">
              <span className="text-xs text-blue-400 uppercase tracking-widest font-bold">Predicted Outcome</span>
              <h3 className="text-3xl md:text-4xl font-bold text-white capitalize tracking-wide">
                {analysis.winnerName}
              </h3>
              <p className="text-zinc-300 text-lg leading-relaxed max-w-4xl font-light">
                {analysis.reasoning}
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};