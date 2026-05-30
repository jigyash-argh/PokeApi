export const PokemonCard = ({ pokemon }) => {

  const image =
    pokemon.sprites.other["official-artwork"].front_default;

  return (
    <div
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      bg-white/5
      backdrop-blur-lg
      border border-white/10
      p-6
      hover:scale-105
      hover:border-yellow-400/50
      transition-all
      duration-300
      shadow-2xl
      "
    >

      <div
        className="
        absolute
        inset-0
        bg-gradient-to-br
        from-yellow-500/10
        via-transparent
        to-cyan-500/10
        opacity-0
        group-hover:opacity-100
        transition-all
        duration-500
        "
      />

      <div className="relative z-10">

        <div className="flex justify-between items-center">

          <h2
            className="
            text-3xl
            font-bold
            capitalize
            text-white
            "
          >
            {pokemon.name}
          </h2>

          <span
            className="
            px-3 py-1
            rounded-full
            bg-yellow-400/20
            text-yellow-300
            font-semibold
            "
          >
            #{pokemon.id}
          </span>

        </div>

        <div className="flex justify-center mt-6">

          <img
            src={image}
            alt={pokemon.name}
            className="
            w-48
            h-48
            object-contain
            group-hover:scale-110
            transition-all
            duration-500
            "
          />

        </div>

        <div className="flex justify-center gap-3 mt-4 flex-wrap">

          {pokemon.types.map((typeInfo) => (
            <span
              key={typeInfo.type.name}
              className="
              px-3
              py-1
              rounded-full
              bg-cyan-500/20
              text-cyan-300
              text-sm
              capitalize
              "
            >
              {typeInfo.type.name}
            </span>
          ))}

        </div>

        <div
          className="
          grid
          grid-cols-2
          gap-4
          mt-6
          "
        >

          <div
            className="
            bg-black/20
            rounded-2xl
            p-4
            text-center
            "
          >
            <p className="text-gray-400 text-sm">
              Height
            </p>

            <h3 className="text-xl font-bold text-white">
              {pokemon.height}
            </h3>
          </div>

          <div
            className="
            bg-black/20
            rounded-2xl
            p-4
            text-center
            "
          >
            <p className="text-gray-400 text-sm">
              Weight
            </p>

            <h3 className="text-xl font-bold text-white">
              {pokemon.weight}
            </h3>
          </div>

        </div>

      </div>

    </div>
  );
};