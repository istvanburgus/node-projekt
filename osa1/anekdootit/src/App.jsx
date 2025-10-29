import { useState } from 'react'

export default function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time... ' +
    'The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place.'
  ]

  // jelenlegi anekdota indexe
  const [selected, setSelected] = useState(0)
  // szavazatok: ugyanannyi elem, mint amennyi anekdota (kezdetben mind 0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const nextRandom = () => {
    const idx = Math.floor(Math.random() * anecdotes.length)
    setSelected(idx)
  }

  const handleVote = () => {
    // immutábilis frissítés: új tömb létrehozása
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p><strong>has {votes[selected]} votes</strong></p>

      <button onClick={handleVote}>vote</button>
      <button onClick={nextRandom}>next anecdote</button>
    </div>
  )
}