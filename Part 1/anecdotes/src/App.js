import React, { useState } from 'react'



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  const CalculateVotes = () => {
    const copy = [...votes ]
    const getMax =  Math.max(...copy) 
    return(<div>{anecdotes[copy.indexOf(getMax)]}</div>)
    }

  const newAnecdote = (who) =>
  () => {
    setSelected(Math.floor((Math.random() * 6)))
  }

  const changeVote = () => {
    const copy = [ ...votes ]
    copy[selected] += 1
    setVotes(copy)
    console.log();
  }
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(6+1).join('0').split('').map(parseFloat))
  
  console.log(votes)
  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}<br/>
      has {votes[selected]} votes<br/>
      <button onClick={newAnecdote()}>New Anecdote</button>&nbsp;&nbsp;&nbsp;
      <button onClick={() =>  changeVote()}>Vote</button><br/>
      
      <h2>Anecdote with the most votes</h2>
      <CalculateVotes></CalculateVotes>
    </div>
  )
}

export default App