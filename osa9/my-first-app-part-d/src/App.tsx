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

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartDesc extends CoursePartBase {
    description: string,
  }
  
  interface CoursePartBasic extends CoursePartDesc {
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackground extends CoursePartDesc {
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartSpecial extends CoursePartDesc {
    requirements: string[];
    kind: "special"
  }

  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;


  const Content = (props: ContentProps) => {
  console.log("TÄSÄ", props.parts)
    return (
    <div>
      {props.parts.map((p, index) => (
        <div key={index}>
          <Part {...p} />
        </div>
      ))}
    </div>
  );
};

const Part = (p: CoursePart) => {
  console.log("PEE", p);
  switch (p.kind) {
    case "basic":
      return (
        <div>
          <p style={{ fontWeight: 'bold'}}>{p.name} {p.exerciseCount}</p>
          <p style={{ fontStyle: 'italic' }}>Description: {p.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <p style={{ fontWeight: 'bold'}}>{p.name} {p.exerciseCount}</p>
          <p>Group projects: {p.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <p style={{ fontWeight: 'bold'}}>{p.name} {p.exerciseCount}</p>
          <p style={{ fontStyle: 'italic' }}>Description: {p.description}</p>
          <p>Background material: {p.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
           <p style={{ fontWeight: 'bold'}}>{p.name} {p.exerciseCount}</p>
          <p style={{ fontStyle: 'italic' }}>Description: {p.description}</p>
          Requirements: {p.requirements.map((r, index) => (
            <div key={index}>
              <p>- {r}</p>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
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
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
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
