import "../styles/styles.css"
import { searchLocation } from "./data"
import { selectTemperatureUnit } from "./handleTemperature"

const searchButton = document.querySelector(".search-button")
const tempButton = document.querySelector(".temp-button")

searchButton.addEventListener("click", searchLocation)
tempButton.addEventListener("click", selectTemperatureUnit)
