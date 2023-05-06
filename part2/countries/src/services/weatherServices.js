import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY

const getCapitalCoordinates = (capital) => {
    const baseUrlCoordinates = `http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=1&appid=${api_key}`
    const request= axios.get(baseUrlCoordinates)
    return request.then(response => response.data)
}

const getCapitalWeather = (lat, lon) => {
    const baseUrlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
    const request= axios.get(baseUrlWeather)
    return request.then(response => response.data)
}

export default {getCapitalCoordinates, getCapitalWeather}