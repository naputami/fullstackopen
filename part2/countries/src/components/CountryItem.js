import React from "react"
import { useState } from "react"
import CountryInfo from "./CountryInfo"

const CountryItem = ({country}) => {
    const [isHidden, setIsHidden] = useState(true)

    const handleButtonClick = () => {
        setIsHidden(!isHidden);
      };

    return (
        <li className="countryItem">
            {country.name.common}
            <button onClick={handleButtonClick}>
                {isHidden ? 'Show' : 'Hide'}
            </button>
            {!isHidden && <CountryInfo country={country} />}
        </li>
    )
}

export default CountryItem
