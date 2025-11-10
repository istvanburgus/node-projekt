export default function PersonForm({
  newName,
  onNameChange,
  newNumber,
  onNumberChange,
  onSubmit
}) {
  return (
    <>
      <h2>Add a new</h2>
      <form onSubmit={onSubmit}>
        <div>
          name:{' '}
          <input
            value={newName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="type a name"
          />
        </div>
        <div>
          number:{' '}
          <input
            value={newNumber}
            onChange={(e) => onNumberChange(e.target.value)}
            placeholder="e.g. 040-1234567"
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}