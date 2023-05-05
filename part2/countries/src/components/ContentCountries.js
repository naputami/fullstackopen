import React from "react"
import CountryInfo from "./CountryInfo"

const ContentCountries = ({countries}) => {
    if(countries.length === 0){
        return (
            <p>Add keyword to show contry list</p>
        )
    }

    if(countries.length > 10){
        return (
            <p>Too many matches, specify another filter</p>
        )
    }

    return (
        <ul>
            {countries.map(country => <CountryInfo key={country.name.common} country={country} />)}
        </ul>
    )
}

export default ContentCountries