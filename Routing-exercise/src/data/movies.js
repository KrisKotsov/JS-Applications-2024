import { get } from "./api.js";

export async function getMovies() {
    return get('/data/movies')
}