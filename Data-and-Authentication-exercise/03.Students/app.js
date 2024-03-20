window.addEventListener("load", getData)
document.getElementById("submit").addEventListener("click", createNewListing)
const url = "http://localhost:3030/jsonstore/collections/students"

async function getData(e) {
    e.preventDefault()
    const tableBody = document.querySelector("table tbody")
    tableBody.innerHTML = ""

    const response = await fetch(url)
    let data = await response.json()
    Object.values(data).forEach(rec => createItems(rec))

    function createItems(data) {
        let tr = document.createElement("tr")

        let firstName = document.createElement("td")
        firstName.textContent = data.firstName
        tr.appendChild(firstName)

        let lastName = document.createElement("td")
        lastName.textContent = data.lastName
        tr.appendChild(lastName)

        let facultyNumber = document.createElement("td")
        facultyNumber.textContent = data.facultyNumber
        tr.appendChild(facultyNumber)

        let grade = document.createElement("td")
        grade.textContent = data.grade
        tr.appendChild(grade)

        tableBody.appendChild(tr)
    }
}

async function createNewListing(e) {
    e.preventDefault()
    let form = document.querySelector("#form")
    let firstName = form.querySelector("input[name='firstName']").value
    let lastName = form.querySelector("input[name='lastName']").value
    let facultyNumber = form.querySelector("input[name='facultyNumber']").value
    let grade = form.querySelector("input[name='grade']").value

    let data = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ firstName, lastName, facultyNumber, grade })
    }

    await fetch(url, data)
    form.reset()
    getData()
}




