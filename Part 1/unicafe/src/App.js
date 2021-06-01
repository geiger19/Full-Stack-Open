import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const Statistic = (props) => {
  if (props.text === "positive")
  {
    return (
      <tr>
        <td>
        {props.text}: {props.value}%
        </td>
      </tr>
    )
  }
  else{
    return (
      <tr>
        <td>
        {props.text}: {props.value}
        </td>
      </tr>
    )
  }
}
const Statistics = (props) => {
      if (props.good + props.bad + props.neutral > 0)
      {
        return (
          <table>
            <tbody>
              <Statistic text="good" value={props.good}/>
              <Statistic text="neutral" value={props.neutral}/>
              <Statistic text="bad" value={props.bad}/>
              <Statistic text="all" value={props.good + props.neutral + props.good}/>
              <Statistic text="average" value={(props.good + (props.bad *-1))/(props.neutral + props.bad + props.good)}/>
              <Statistic text="positive" value={(props.good + props.neutral)/ ((props.neutral + props.bad + props.good))}/>
            </tbody>
          </table>
        )
      }
      else{return (<div>No feedback given</div> )}
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleGoodClick = () => {
    setAll(allClicks.concat('G'))
    setGood(good + 1)
  }
  const handleNuetralClick = () => {
    setAll(allClicks.concat('N'))
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setAll(allClicks.concat('B'))
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button handleClick={() => handleGoodClick()} text="Good" />
      <Button handleClick={() => handleNuetralClick()} text="Neutral" />
      <Button handleClick={() => handleBadClick()} text="Bad" />
      <h2>Statistics</h2>
      
      <Statistics good = {good} neutral = {neutral} bad = {bad}></Statistics>
    </div>

  )
}

export default App