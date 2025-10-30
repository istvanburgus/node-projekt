import { useState } from 'react'


const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>
  }
  return <div>button press history: {allClicks.join(' ')}</div>
}

const Clicks = ({ clicks }) => {
  return (
    <div>
      left: {clicks.left} — right: {clicks.right}
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

export default function App() {
  const [clicks, setClicks] = useState({ left: 0, right: 0 })
  const [allClicks, setAllClicks] = useState([])

  const handleLeftClick = () => {
    setClicks({ left: clicks.left + 1, right: clicks.right })
    setAllClicks(allClicks.concat('L'))
  }

  const handleRightClick = () => {
    setClicks({ left: clicks.left, right: clicks.right + 1 })
    setAllClicks(allClicks.concat('R'))
  }

  return (
    <>
      <div>
        {clicks.left}
        <Button onClick={handleLeftClick} text="Left" />
        <Button onClick={handleRightClick} text="Right" />
        {clicks.right}
      </div>

      <History allClicks={allClicks} />
      <Clicks clicks={clicks} />
    </>
  )
}