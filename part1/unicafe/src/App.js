import { useState } from 'react'

const Title = props => <h2>{props.text}</h2>

const StatisticLine = ({text, value}) => <p>{text} {value}</p>

const Statistics = (props) => {
  if(props.data.total === 0 ){
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <StatisticLine text='good' value={props.data.good} />
      <StatisticLine text='neutral' value={props.data.neutral} />
      <StatisticLine text='bad' value={props.data.bad} />
      <StatisticLine text='all' value={props.data.total} />
      <StatisticLine text='average' value={props.data.avg} />
      <StatisticLine text='positive' value={props.data.pct} />
    </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const App = () => {
  // save clicks of each button to its own state
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

  const averageScore = () => {
    if(total === 0){
      return 0
    } //try to remove later

    return ((good * 1) + (neutral * 0) + (bad * -1)) / total
  
  }

  const percentagePositiveFeedback = () => {
    if(total === 0){
      return 0
    } //try to remove later

    const percent = (good / total) * 100
    return `${percent} %`
  
  }

  const data = {
    good: good,
    bad: bad,
    neutral: neutral,
    total: total,
    avg: averageScore(),
    pct: percentagePositiveFeedback()
  }


  return (
    <div>
      <Title text='give feedback' />
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Title text='statistic' />
      <Statistics data={data} />
    </div>
  )
}

export default App