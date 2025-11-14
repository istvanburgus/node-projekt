export default function Notification({ message, type }) {
  if (!message) return null

  const className =
    type === 'error'
      ? 'notification error'
      : 'notification success'

  return (
    <div className={className}>
      {message}
    </div>
  )
}