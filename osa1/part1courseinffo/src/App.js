const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

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
        <Part p={props.part1} ex={props.exercises1}></Part>
        <Part p={props.part2} ex={props.exercises2}></Part>
        <Part p={props.part3} ex={props.exercises3}></Part>
      </div>
    )
  }

  const Total = (props) => {
    return (
      <div>
        Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}
      </div>
    )
  }

  return (
    <div>
      <Header course={course}></Header>
      <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2}
      part3={part3} exercises3={exercises3}></Content>
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}></Total>
    </div>
  )
}

export default App
