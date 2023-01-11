const Header = ({course}) => {
    console.log("Header", course.name);
    return course.name;
  }
  
  const Part = ({osa}) => {
    console.log("Part: ", osa)
    return (
      <li>
        {osa.name} {osa.exercises}
      </li>
    )
  }
  
  const Content = ({course}) => {
    console.log("Content:", course.parts[0])
    const lista = []
    for (var i = 0; i < course.parts.length; i++) {
      lista.push(course.parts[i].exercises)
    }
    console.log("lista", lista)
    //tähän mappi
    const osat = course.parts
    const total = lista.reduce(
      (accumulator, currentValue) => accumulator + currentValue, 0
      );
    console.log("total", total)
    return (
      <div>
        <h1><Header course={course}/></h1>
        <ul>
          {osat.map(osa => <Part key={osa.id} osa={osa} />
          )}
        </ul>
        <p>Total number of exercises {total}</p>
      </div>
    )
    
  }
  
  const Course = ({courses}) => {
    console.log("Courses obj", courses)
    return (
  
      <div>
        <h1>Web development curriculum</h1>
        <ul>
          {courses.map(course => <Content key={course.id} course={course}/>)}
        </ul>
      </div>
    )
  }

  
  export default Course