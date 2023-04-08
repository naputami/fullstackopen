const Header = (props) => {
  return (
    <>
    <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <div key={props.id} >
        <p>{props.part} {props.excersise}</p>
    </div>
  )
}

const Content = (props) => {
  const items = props.items;
  return (
   <>
    {items.map(item => (<Part key={item.id} part={item.name} excersise={item.exercises}/>))}
   </>
  )
}

const Total = (props) => {
  const items = props.items;
  return (
    <>
       <p>Number of exercises {items.reduce((acc, obj)=> acc + obj.exercises, 0)}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }


  return (
    <div>
     <Header course={course.name} />
     <Content items={course.parts}/>
     <Total items={course.parts} />
    </div>
  )
}

export default App;
