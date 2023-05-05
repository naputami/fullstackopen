import React from "react"

const CountryInfo = ({country}) => {
    const languages = Object.values(country.languages);
    return (
        <>
            <h2>{country.name.common}</h2>
            <p>{country.capital}</p>
            <p>area: {country.area}</p>

            <p><b>languages:</b></p>
            <ul>
                {languages.map(languange => <li key={languange}>{languange}</li>)}
            </ul>
            <div>
                <img src={country.flags.png} alt={country.flags.alt} />
            </div>
        </>
    )
}

export default CountryInfo