import React from 'react'

const PersonForm = ({addName, newName, handleNameInput, newNumber, handleNumberInput }) => {

    return (
        <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameInput}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberInput} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm