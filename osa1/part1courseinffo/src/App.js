const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = (props) => {
    console.log(props.course)
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }

  const Part = (props) => {
    return (
      <div>
        {props.p} {props.ex}
      </div>
    )
  }

  const Content = (props) => {
    console.log(props.course)
    return (
      <div>
        <Part p={props.parts[0].name} ex={props.parts[0].exercises}></Part>
        <Part p={props.parts[1].name} ex={props.parts[1].exercises}></Part>
        <Part p={props.parts[2].name} ex={props.parts[2].exercises}></Part>
      </div>
    )
  }

  const Total = (props) => {
    return (
      <div>
        Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
      </div>
    )
  }

  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  )
}

export default App
