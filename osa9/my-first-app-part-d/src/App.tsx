import PropTypes from "prop-types";

const App = () => {

  interface HeaderProps {
    name: string;
  }
  

  const Header = (props: HeaderProps) => {
    return <h1>{props.name}</h1>;
    
  }

  interface ContentProps {
    parts: CoursePart[];
  }

  interface CoursePart {
    name: string;
    exerciseCount: number;
  }

  const Content = (props: ContentProps) => {
    console.log(props)
    return (
    <div>
      {props.parts.map((p, index) => (
        <p key={index}>
          {p.name} {p.exerciseCount}
        </p>
      ))}
  </div>
    );
  };

const Total = (props: ContentProps) => {
  return (
    <p>
    Number of exercises{" "}
    {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
  )
}

  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName}/>
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
