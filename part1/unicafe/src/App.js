import { useState } from 'react'

const Title = props => <h2>{props.text}</h2>

const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({bad, good, neutral, total}) => {
  if(total === 0 ){
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  const roundedNum = num => num.toFixed(1)

  const averageScore =  total > 0 ? roundedNum(((good * 1) + (neutral * 0) + (bad * -1)) / total) : 0
  const percentageGoodScore =  total > 0 ? roundedNum((good / total) * 100) : 0

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={total} />
          <StatisticLine text='average' value={averageScore} />
          <StatisticLine text='positive' value={percentageGoodScore + ' %'} />
        </tbody>
      </table>
    </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(good + updatedNeutral + bad)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(good + neutral + updatedBad)
  }
  
  return (
    <div>
      <Title text='give feedback' />
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Title text='statistic' />
      <Statistics bad={bad} good={good} neutral={neutral} total={total} />
    </div>
  )
}

export default App