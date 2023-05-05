import React from 'react'

const Person = ({name, number, id, toggleDelete}) => {
    return (
        <div>
            <p>{name} {number}  <button onClick={() => toggleDelete(id)}>delete</button></p>
        </div>
    )
}

export default Person