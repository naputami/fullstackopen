import React from 'react'
import Person from './Person'

const Persons = ({persons, filteredPerson, filterName}) => {
    if(persons.length === 0) {
        return (
            <p>No contact is saved yet</p>
        )
    }

    if(filterName !== '' && filteredPerson.length === 0){
        return (
            <p>Name not found</p>
        )
    }

    const showData = filteredPerson.length > 0 ? filteredPerson : persons

    return (
        <div>
            {showData.map(data=> <Person key={data.id} name={data.name} number={data.number}/>)}
        </div>
    )

}

export default Persons

