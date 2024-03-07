async function todayForecast(code) {
    const url = `http://localhost:3030/jsonstore/forecaster/today/${code}`
    const request = await fetch(url)
    const response = await request.json()
    return response
}

async function threeDayForecast(code) {
    const url = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`
    const request = await fetch(url)
    const response = await request.json()
    return response
}


function attachEvents() {
    const locationInput = document.getElementById("location")
    const submitBtn = document.getElementById("submit")
    const forecast = document.getElementById("forecast")
    const currentForecast = document.getElementById("current")
    const upcomingForecast = document.getElementById("upcoming")

    function oneDayPrognosis(condition, high, low, name) {
        const forecastDiv = document.createElement("div")
        forecastDiv.className = "forecasts"

        const spanSymbol = document.createElement("span")
        spanSymbol.className = "condition symbol"
        if (condition == "Sunny") {
            spanSymbol.textContent = "☀"
        } else if (condition == "Partly sunny") {
            spanSymbol.textContent = "⛅"
        } else if (condition == "Overcast") {
            spanSymbol.textContent = "☁"
        } else if (condition == "Rain") {
            spanSymbol.textContent = "☂"
        }
        forecastDiv.appendChild(spanSymbol)

        const spanCondition = document.createElement("span")
        spanCondition.className = "condition"

        const spanOne = document.createElement("span")
        spanOne.className = "forecast-data"
        spanOne.textContent = name

        const spanTwo = document.createElement("span")
        spanTwo.className = "forecast-data"
        spanTwo.textContent = `${low}°/${high}°`

        const spanThree = document.createElement("span")
        spanThree.className = "forecast-data"
        spanThree.textContent = condition

        spanCondition.appendChild(spanOne)
        spanCondition.appendChild(spanTwo)
        spanCondition.appendChild(spanThree)

        forecastDiv.appendChild(spanCondition)
        currentForecast.appendChild(forecastDiv)
        forecast.style.display = "block"
    }

    function threeDayPrognosis(conditionDay1, highDay1, lowDay1, conditionDay2, highDay2, lowDay2, conditionDay3, highDay3, lowDay3) {
        const forecastInfoDiv = document.createElement("div");
        forecastInfoDiv.className = "forecast-info";

        const spanDay1 = createForecastSpan(conditionDay1, highDay1, lowDay1);
        forecastInfoDiv.appendChild(spanDay1);

        const spanDay2 = createForecastSpan(conditionDay2, highDay2, lowDay2);
        forecastInfoDiv.appendChild(spanDay2);

        const spanDay3 = createForecastSpan(conditionDay3, highDay3, lowDay3);
        forecastInfoDiv.appendChild(spanDay3);

        upcomingForecast.appendChild(forecastInfoDiv);
    }

    function createForecastSpan(condition, high, low) {
        const spanDay = document.createElement("span");
        spanDay.className = "upcoming";

        const spanSymbol = document.createElement("span");
        spanSymbol.className = "symbol";
        if (condition == "Sunny") {
            spanSymbol.textContent = "☀";
        } else if (condition == "Partly sunny") {
            spanSymbol.textContent = "⛅";
        } else if (condition == "Overcast") {
            spanSymbol.textContent = "☁";
        } else if (condition == "Rain") {
            spanSymbol.textContent = "☂";
        }

        const spanHighLow = document.createElement("span");
        spanHighLow.className = "forecast-data";
        spanHighLow.textContent = `${low}°/${high}°`;

        const spanCondition = document.createElement("span");
        spanCondition.className = "forecast-data";
        spanCondition.textContent = condition;

        spanDay.appendChild(spanSymbol);
        spanDay.appendChild(spanHighLow);
        spanDay.appendChild(spanCondition);

        return spanDay;
    }
    async function getFirstElements() {
        try {
            const locationValue = locationInput.value
            const url = `http://localhost:3030/jsonstore/forecaster/locations`
            const request = await fetch(url)
            const response = await request.json()

            const foundLocation = response.find(({ name }) => name == locationValue)
            const { code } = foundLocation

            const oneDay = await todayForecast(code)
            const threeDay = await (threeDayForecast(code))

            const { forecast: { condition, high, low }, name: oneDayCityName } = oneDay
            const { forecast: threeDayForecastData, name: threeDayCityName } = threeDay

            const [day1, day2, day3] = threeDayForecastData;

            const { condition: conditionDay1, high: highDay1, low: lowDay1 } = day1;
            const { condition: conditionDay2, high: highDay2, low: lowDay2 } = day2;
            const { condition: conditionDay3, high: highDay3, low: lowDay3 } = day3;

            oneDayPrognosis(condition, high, low, oneDayCityName)
            threeDayPrognosis(conditionDay1, highDay1, lowDay1, conditionDay2, highDay2, lowDay2, conditionDay3, highDay3, lowDay3)


        } catch (err) {
        }
    }


    submitBtn.addEventListener("click", getFirstElements)
}

attachEvents();