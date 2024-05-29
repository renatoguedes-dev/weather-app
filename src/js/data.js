import { currentTempUnit } from "./handleTemperature"

const container = document.querySelector(".container")
const loadingEl = document.querySelector("#loading")
const notFoundEl = document.querySelector("#not-found")
const locationEl = document.querySelector(".location > h1")
const currentTempEl = document.querySelector(".current-temp > p")
const minTempEl = document.querySelector(".min-temp")
const maxTempEl = document.querySelector(".max-temp")
const feelsLikeText = document.querySelector(".temp-feels-like > h1")
const feelsLikeEl = document.querySelector(".feels-like-temp")
const conditionTextEl = document.querySelector(".condition-text")
const conditionIconEl = document.querySelector(".condition-icon")
const chanceToRainTextEl = document.querySelector(".chance-to-rain > h1")
const chanceToRainEl = document.querySelector(".chance-to-rain > p")

export let data

export async function getData(location) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=5e29f2c284fa4892930184320242705&q=${location}&days=3&aqi=no&alerts=no`,
            { mode: "cors" }
        )

        if (!response.ok) {
            throw new Error("City not found.")
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function searchLocation(e) {
    e.preventDefault()

    const inputValue = document.querySelector("#search-input").value
    clearElements()

    if (!inputValue) {
        notFoundEl.style.display = "block"
        container.style.backgroundColor = ""
        minTempEl.style.backgroundColor = ""
        maxTempEl.style.backgroundColor = ""
        return
    }

    const location = inputValue
    loadingEl.style.display = "block"
    notFoundEl.style.display = "none"

    try {
        data = await getData(location)
        fillElements(data)
        notFoundEl.style.display = "none"
        container.style.backgroundColor = "rgb(0, 0, 0, 0.6)"
        minTempEl.style.backgroundColor = "lightblue"
        maxTempEl.style.backgroundColor = "orange"
    } catch (error) {
        notFoundEl.style.display = "block"
        data = ""
        container.style.backgroundColor = ""
        minTempEl.style.backgroundColor = ""
        maxTempEl.style.backgroundColor = ""
    } finally {
        loadingEl.style.display = "none"
    }
}

export function fillElements(data) {
    const city = data.location.name
    const region = data.location.region
    const country = data.location.country
    const localTime = data.location.localtime
    const tempC = data.current.temp_c
    const tempF = data.current.temp_f

    const conditionText = data.current.condition.text
    const conditionIcon = data.current.condition.icon
    const feelsLikeC = data.current.feelslike_c
    const feelsLikeF = data.current.feelslike_f

    const todayForecast = data.forecast.forecastday[0].day
    const minTempC = todayForecast.mintemp_c
    const minTempF = todayForecast.mintemp_f
    const maxTempC = todayForecast.maxtemp_c
    const maxTempF = todayForecast.maxtemp_f
    const chanceToRain = todayForecast.daily_chance_of_rain

    locationEl.textContent = `${city}, ${country}`
    conditionTextEl.textContent = conditionText
    conditionIconEl.src = conditionIcon
    chanceToRainTextEl.textContent = "Chance to rain:"
    chanceToRainEl.textContent = chanceToRain + "%"

    feelsLikeText.textContent = "Feels Like"

    if (currentTempUnit === "celsius") {
        currentTempEl.textContent = tempC + " °C"
        minTempEl.textContent = minTempC + " °C"
        maxTempEl.textContent = maxTempC + " °C"
        feelsLikeEl.textContent = feelsLikeC + " °C"
    } else if (currentTempUnit === "fahrenheit") {
        currentTempEl.textContent = tempF + " °F"
        minTempEl.textContent = minTempF + " °F"
        maxTempEl.textContent = maxTempF + " °F"
        feelsLikeEl.textContent = feelsLikeF + " °F"
    }
}

function clearElements() {
    locationEl.textContent = ""
    conditionTextEl.textContent = ""
    conditionIconEl.src = ""
    chanceToRainEl.textContent = ""
    currentTempEl.textContent = ""
    minTempEl.textContent = ""
    maxTempEl.textContent = ""
    feelsLikeEl.textContent = ""
    feelsLikeText.textContent = ""
    chanceToRainTextEl.textContent = ""
}
