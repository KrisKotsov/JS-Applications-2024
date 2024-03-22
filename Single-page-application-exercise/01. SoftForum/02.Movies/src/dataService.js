import { get } from "./requester.js "

const baseUrl = "http://localhost:3030/"
const endPoints = {
    catalog: "data/movies"
}

async function getAllMovies() {
    return await get(baseUrl + endPoints.catalog)
}

export { getAllMovies }