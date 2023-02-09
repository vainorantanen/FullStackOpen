import Course from "./components/Courses"


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    },
    {
      name: 'Johtaminen',
      id: 3,
      parts: [
        {
          name: 'Älämölö',
          exercises: 5,
          id: 1
        },
        {
          name: 'Huutaminen',
          exercises: 7,
          id: 2
        }
      ]
    },
    {
      name: 'Yrittäminen',
      id: 4,
      parts: [
        {
          name: 'Rahanteko',
          exercises: 333,
          id: 1
        },
        {
          name: 'Markkinointi',
          exercises: 11,
          id: 2
        }
      ]
    }
  ]

  //const totalex = parts[0].exercises + parts[1].exercises + parts[2].exercises

  

  return (
    <div>
      <Course courses={courses} />
    </div>
  )
}

export default App