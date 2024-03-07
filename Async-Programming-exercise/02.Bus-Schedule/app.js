function solve() {

    const info = document.getElementById("info")
    const departBtn = document.getElementById("depart")
    const arriveBtn = document.getElementById("arrive")
    const firstStop = "depot"
    const url = `http://localhost:3030/jsonstore/bus/schedule/${firstStop}`

    async function depart() {
        try {
            const req = await fetch(url)
            const response = await req.json()
            let { name, next } = response
            info.textContent = `Next stop ${name}`
            departBtn.disabled = true
            arriveBtn.disabled = false

        } catch (err) {
            info.textContent = "Error"
            departBtn.disabled = true
            arriveBtn.disabled = true
        }
    }

    async function arrive() {
        try {
            const req = await fetch(url)
            const response = await req.json()
            let { name } = response
            info.textContent = `Arriving at ${name}`
            departBtn.disabled = false
            arriveBtn.disabled = true
        } catch (err) {
            info.textContent = "Error"
            departBtn.disabled = true
            arriveBtn.disabled = true
        }
    }


    return {
        depart,
        arrive
    };
}

let result = solve();