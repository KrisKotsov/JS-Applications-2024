async function getInfo() {
    const busIdRef = document.getElementById("stopId").value
    const stopName = document.getElementById("stopName")
    const busesList = document.getElementById("buses")

    const url = `http://localhost:3030/jsonstore/bus/businfo/${busIdRef}`
    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data);

        let { buses, name } = data

        stopName.textContent = name

        const busItems = Object.entries(buses).map(([busId, time]) => {
            const element = document.createElement("li");
            element.textContent = `Bus ${busId} arrives in ${time} minutes`;
            return element;
        });
        busesList.textContent = ""
        busItems.forEach(item => busesList.appendChild(item))



    } catch (err) {
        stopName.textContent = "Error"
    }
}