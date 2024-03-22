export function showDetails(e) {
    e.preventDefault()
    document.querySelectorAll("section").forEach(section => section.style.display = "none")
    document.getElementById("movie-example").style.display = "block"

    const id = e.target.dataset.id
}