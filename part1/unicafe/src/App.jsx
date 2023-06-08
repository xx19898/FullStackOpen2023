import { useState } from 'react'
import Statistics from './Statistics'
import Button from './Button'

function App() {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>Give feedback</h1>
      <Button callback={setGood} currentValue={good} text={'Good'}/>
      <Button callback={setNeutral} currentValue={neutral} text={'Neutral'}/>
      <Button callback={setBad} currentValue={bad} text={'Bad'}/>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App
