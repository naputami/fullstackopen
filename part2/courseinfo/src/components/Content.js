import React from "react"
import Part from "./Part"

const Content = ({items}) => {
    return (
     <>
      {items.map(item => (<Part key={item.id} part={item.name} excersise={item.exercises}/>))}
     </>
    )
}

export default Content