import './index.css'

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasicAndBackground extends CoursePartBase{
  description: string;
}

interface CoursePartBasic extends CoursePartBasicAndBackground{
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBasicAndBackground{
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartRequirements extends CoursePartBasicAndBackground{
  requirements: string[],
  kind: 'special'
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;


const Part = ({coursePart}:{coursePart: CoursePart}) => {

  function variablePart(coursePart: CoursePart){
    switch(coursePart.kind){
      case 'basic':
        return <><p className="cell">Description:</p><p className="cell-content">{coursePart.description}</p></>
      case 'background':
        return <><p className="cell">Description:</p><p className="cell-content">{coursePart.description}</p></>
      case 'group':
        return <><p className="cell">Group Project Count:</p><p className="cell-content">{coursePart.groupProjectCount}</p></>
      case 'special':
        return <><p className="cell">Requirements:</p><p className="cell-content">{coursePart.requirements.reduce((acc,curr) => `${acc} ${curr}`,'')}</p></>
      default:
        return <></>

    }
  }

  return(
    <div className="part-main">
      <p className="cell">Name:</p> <p className="cell-content">{coursePart.name}</p>
      <p className="cell">Exercise count:</p> <p className="cell-content">{coursePart.exerciseCount}</p>
      <p className="cell">Kind:</p> <p className="cell-content">{coursePart.kind}</p>
      {
        variablePart(coursePart)
      }
    </div>
  )
}

const App = () => {
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
      {
        courseParts.map((part) => <Part coursePart={part} />)
      }
    </div>
  );
};

export default App;