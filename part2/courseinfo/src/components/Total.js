import React from "react"

const Total = ({items}) => {
    return (
      <>
         <h4>total of {items.reduce((acc, obj)=> acc + obj.exercises, 0)} exercises</h4>
      </>
    )
}

export default Total