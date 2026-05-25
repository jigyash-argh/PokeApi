import { api } from "../api/axios";
export async function getPokemon(name:string) {
    const response=await api.get(`/pokemon/${name}`);
    return response.data;
}