import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <tr>
      <td>
        {props.text}
      </td>
      <td>
        {props.value}
      </td>
    </tr>
  )
}

const Statistics = (props) => {
  console.log(props.stats)

  if (props.stats.all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <table>
        <StatisticLine text="good" value ={props.stats.good} />
        <StatisticLine text="neutral" value ={props.stats.neutral} />
        <StatisticLine text="bad" value ={props.stats.bad} />
        <StatisticLine text="all" value ={props.stats.all} />
        <StatisticLine text="average" value ={props.stats.avg} />
        <StatisticLine text="positive" value ={props.stats.positive} />
      </table>
    )
  }
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad;
  const avg = (good*1 - bad*1)/all;
  const luku = good/all*100;
  const positive = `${luku} %`
  const stats = {good, neutral, bad, all, avg, positive}

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good +1)} text='good' />
      <Button handleClick={() => setNeutral(neutral +1)} text='neutral' />
      <Button handleClick={() => setBad(bad +1)} text='bad'/>
      <h2>Statistics</h2>
      <Statistics stats={stats} />
    </div>
  )
}

export default App