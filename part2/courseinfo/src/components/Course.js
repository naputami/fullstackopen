import React from "react"
import Header from "./Header"
import Content from "./Content"
import Total from "./Total"
  
const Course = ({name, parts}) => {
    return (
      <div>
        <Header name={name} />
        <Content items={parts} />
        <Total items={parts} />
      </div>
    )
}

export default Course