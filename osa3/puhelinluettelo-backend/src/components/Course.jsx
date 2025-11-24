const Header = ({ name }) => <h2>{name}</h2>

const Part = ({ name, exercises }) => (
  <p>{name} {exercises}</p>
)

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

export default function Course({ course }) {
  return (
    <section>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </section>
  )
}