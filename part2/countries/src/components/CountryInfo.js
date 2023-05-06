import React from "react"
import Weather from "./Weather";

const CountryInfo = ({country}) => {
    const languages = Object.values(country.languages);
    return (
        <>
            <h2>{country.name.common}</h2>
            <p>Capital city: {country.capital}</p>
            <p>Area: {country.area}</p>

            <p><b>Languages:</b></p>
            <ul style={{marginBottom: "1rem"}}>
                {languages.map(languange => <li key={languange}>{languange}</li>)}
            </ul>
            <div>
                <img src={country.flags.png} alt={country.flags.alt} style={{border: "1px solid black"}} />
            </div>
            <Weather country={country} />
        </>
    )
}

export default CountryInfo