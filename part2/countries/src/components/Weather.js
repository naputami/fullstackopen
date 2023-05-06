import React from "react"
import {  useEffect, useState } from "react"
import weatherServices from "../services/weatherServices"

const Weather = ({country}) => {
    const [temperature, setTemperature] = useState("")
    const [wind, setWind] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [weatherDesc, setWeatherDesc] = useState("")

    useEffect(() => {
        weatherServices.getCapitalCoordinates(country.capital)
        .then(response => {
            const lon = response[0].lon
            const lat = response[0].lat
            weatherServices.getCapitalWeather(lat, lon)
            .then(response => {
                setTemperature(response.main.temp)
                setWind(response.wind.speed)
                const icon = response.weather[0].icon
                const url = `https://openweathermap.org/img/wn/${icon.toString()}@2x.png`
                setImgUrl(url)
                setWeatherDesc(response.weather[0].description)
            })
        })
    },[country.capital])

    return (
        <>
            <h3>Weather in {country.capital}</h3>
            <p>temperature: {temperature}<sup>o</sup>&nbsp;C</p>
            <p>weather: {weatherDesc}</p>
            <img src={imgUrl} alt="weather icon" />
            <p>wind speed: {wind}</p>
        </>
    )
}

export default Weather