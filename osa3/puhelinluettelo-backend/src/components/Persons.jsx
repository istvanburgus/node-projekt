export default function Persons({ persons, onDelete }) {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {persons.map(p => (
          <li key={p.id}>
            {p.name} — {p.number}{' '}
            <button onClick={() => onDelete(p.id, p.name)}>delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}