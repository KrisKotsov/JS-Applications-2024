import { getAllMovies } from "./dataService.js"
import { getUserId } from "./userHelper.js"
import { showDetails } from "./details.js"

const ul = document.getElementById("movies-list")

export function showHome() {
    document.querySelectorAll("section").forEach(section => section.style.display = "none")
    document.getElementById("home-page").style.display = "block"

    const userId = getUserId()
    if (userId) {
        showAddBtn()
    }

    showAllMovies(userId)
}

function showAddBtn() {
    document.getElementById("add-movie-button").style.display = "block"
}

async function showAllMovies(userId) {
    ul.innerHTML = ""
    document.getElementById("movie").style.display = "block"
    const data = await getAllMovies()
    data.forEach(movie => createMovie(movie, userId))
}

function createMovie(data, userId) {
    const li = document.createElement("li")
    li.classList.add("card")
    li.classList.add("md-4")
    li.innerHTML = `
    <img src=${data.img}
    class="card-img-top"
    alt="no img">
    <div class="card-body">
    <h4 class="card-tite">${data.title}</h4>
    </div>
    <div class="card-footer">
    <a href="/details/${title._id}>
    <button data-id=${data._id} type="button" class="btn btn-info"> Details </button>
    </a>
    </div>
    `

    if (!userId) {
        li.querySelector(".card-footer a").style.display = "none"
    } else {
        li.querySelector(".card-footer a").addEventListener("click", showDetails)
    }

    ul.appendChild(li)
}
