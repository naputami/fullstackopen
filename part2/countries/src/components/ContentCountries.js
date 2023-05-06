import React from "react"
import CountryItem from "./CountryItem"

const ContentCountries = ({countries}) => {
    if(countries.length === 0){
        return (
            <p className="infodisplay">Add keyword to show country list</p>
        )
    }

    if(countries.length > 10){
        return (
            <p className="infodisplay">Too many matches, specify another filter</p>
        )
    }

    return (
        <ul className="countryList">
            {countries.map(country => <CountryItem key={country.name.common} country={country} />)}
        </ul>
    )
}

export default ContentCountries