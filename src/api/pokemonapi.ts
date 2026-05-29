import { api } from "./axios";
export const getPokemonList=async()=>{
    const response=await api.get('/pokemon?limit=20');
    return response.data;
}
export const getPokemonbyName=async(name:string)=>{
    const response=await api.get(`/pokemon/${name}`);
    return response.data;
}
export const getPokemonById = async (id: number) => {
  const response = await api.get(`/pokemon/${id}`);
  return response.data;
};
export const getFeaturedPokemons = async (
  limit = 6
) => {

  const list = await api.get(
    `/pokemon?limit=${limit}`
  );

  const detailedPokemons = await Promise.all(
    list.data.results.map((pokemon) =>
      api.get(`/pokemon/${pokemon.name}`)
    )
  );

  return detailedPokemons.map(
    (pokemon) => pokemon.data
  );
};