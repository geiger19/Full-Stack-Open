import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdote, handleClick }) => {
  return(
    <li>
      {anecdote.content} 
      <strong> {anecdote.votes} </strong>
      <button onClick={handleClick}>Vote</button>
    </li>
  )
}


const Anecdotes = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()
  
  const AnecdoteVote = (anecdote) => {  
    dispatch(addVote(anecdote.id))
    dispatch(setNotification(`you added '${anecdote.content}'`, 10))

  }
  return(
    <ul>
      {anecdotes
      .filter((anecdote) => anecdote.content.includes(filter))
      .sort((a,b) => a.votes > b.votes  ? -1 : 1)
      .map(anecdote => 
        <AnecdoteList
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => 
            AnecdoteVote(anecdote)
          }
        />
      )}
    </ul>
  )

  
}

export default Anecdotes