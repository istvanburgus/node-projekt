export default function Filter({ filterText, onChange }) {
  return (
    <div>
      filter shown with:{' '}
      <input
        value={filterText}
        onChange={(e) => onChange(e.target.value)}
        placeholder="type to filter by name"
      />
    </div>
  )
}