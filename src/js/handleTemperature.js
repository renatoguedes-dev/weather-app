import { data, fillElements } from "./data"

export let currentTempUnit = "celsius"

export function selectTemperatureUnit(e) {
    e.preventDefault()
    const currentTemp = e.target
    toggleTemp(currentTemp)

    if (data) {
        updateTemperatureDisplayed(data)
    }
}

function toggleTemp(currentTemp) {
    if (currentTemp.classList.contains("celsius")) {
        currentTemp.classList.remove("celsius")
        currentTemp.classList.add("fahrenheit")
        currentTemp.textContent = "°F"
        currentTempUnit = "fahrenheit"
    } else if (currentTemp.classList.contains("fahrenheit")) {
        currentTemp.classList.remove("fahrenheit")
        currentTemp.classList.add("celsius")
        currentTemp.textContent = "°C"
        currentTempUnit = "celsius"
    }
}

function updateTemperatureDisplayed(data) {
    fillElements(data)
}
