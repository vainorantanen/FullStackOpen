import { useState } from 'react'



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  
  const [first, setFirst] = useState(0)
  const [second, setSecond] = useState(0)
  const [third, setThird] = useState(0)
  const [fourth, setFourth] = useState(0)
  const [fifth, setFifth] = useState(0)
  const [sixth, setSixth] = useState(0)
  const [seventh, setSeventh] = useState(0)

  const points = [first, second, third, fourth, fifth, sixth, seventh]

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const [selected, setSelected] = useState(0)

  //console.log("selected", selected)
  //console.log("points", points)

  const shuffle = () => {
    const rand = getRandomInt(7);
    console.log("rand", rand)
    setSelected(rand)
  }

  const voteCurrent = (luku) => {
    if (luku === 0) {
      setFirst(first +1)
    } else if (luku === 1) {
      setSecond(second+1)
    } else if (luku === 2) {
      setThird(third+1)
    } else if (luku === 3) {
      setFourth(fourth+1) 
    } else if (luku === 4) {
      setFifth(fifth+1)
    } else if (luku === 5) {
      setSixth(sixth+1)
    } else if (luku === 6) {
      setSeventh(seventh+1)
    }
  }

  const findMax = () => {
    let max = 0;
    let maxIndex = 0;
    for (var i = 0; i < points.length; i++) {
      if (points[i] > max) {
        max = points[i]
        maxIndex = i
      }
    }

    //console.log(max, maxIndex)

    return (
      <div>
        <p>{anecdotes[maxIndex]}</p>
        <p>has {max} votes</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={() => voteCurrent(selected)}>Vote</button>
      <button onClick={() => shuffle()}>Next anecdote</button>
      <h1>Anecdote with most votes:</h1>
      {findMax()}
    </div>
  )
}

export default App