// 2.1–2.3 kurssitiedot: Course + map + reduce

export default function App() {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        { id: 1, name: 'Fundamentals of React', exercises: 10 },
        { id: 2, name: 'Using props to pass data', exercises: 7 },
        { id: 3, name: 'State of a component', exercises: 14 },
        { id: 4, name: 'Redux', exercises: 11 },
      ],
    },
    {
      id: 2,
      name: 'Node.js',
      parts: [
        { id: 1, name: 'Routing', exercises: 3 },
        { id: 2, name: 'Middlewares', exercises: 7 },
      ],
    },
  ]

  const Header = ({ name }) => <h2>{name}</h2>
  const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

  const Content = ({ parts }) => (
    <>
      {parts.map(p => (
        <Part key={p.id} name={p.name} exercises={p.exercises} />
      ))}
    </>
  )

  const Total = ({ parts }) => {
    const total = parts.reduce((sum, p) => sum + p.exercises, 0)
    return <p><strong>total of {total} exercises</strong></p>
  }

  const Course = ({ course }) => (
    <section>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </section>
  )

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(c => (
        <Course key={c.id} course={c} />
      ))}
    </div>
  )
}
