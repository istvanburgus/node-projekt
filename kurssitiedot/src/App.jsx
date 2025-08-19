function Header({ course }) {
  return <h1>{course}</h1>
}

function Content({ parts }) {
  const [p1, p2, p3] = parts
  const { name: n1, exercises: e1 } = p1
  const { name: n2, exercises: e2 } = p2
  const { name: n3, exercises: e3 } = p3

  return (
    <div>
      <p>{n1} {e1}</p>
      <p>{n2} {e2}</p>
      <p>{n3} {e3}</p>
    </div>
  )
}

function Total({ parts }) {
  const sum = parts[0].exercises + parts[1].exercises + parts[2].exercises
  return <p>Number of exercises {sum}</p>
}

function App() {
  const course = 'Half Stack application development'
  const parts = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
