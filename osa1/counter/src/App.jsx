import { useState } from 'react'

export default function App() {
  const [counter, setCounter] = useState(0)

  
  const handlePlus = () => setCounter(counter + 1)

  return (
    <div>
      <h1>Counter</h1>
      <p>Arvo / Value: {counter}</p>
      <button onClick={handlePlus}>plus</button>
    </div>
  )
}