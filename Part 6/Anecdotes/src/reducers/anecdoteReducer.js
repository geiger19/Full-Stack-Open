import anecdoteServices from "../services/anecdotes"



const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTE':
      return action.data
    case 'ADD_VOTE':
      const id = action.data.id
      const applyFilter = state.filter(as => as.id !== id)
      const filteredState = [...applyFilter, action.data]
      return filteredState.sort((a, b) => b.votes - a.votes)
    default:
      return state
    
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const voteAnecdote = await anecdoteServices.addVote(anecdote)
    dispatch({
    type: 'ADD_VOTE',
    data: voteAnecdote,
  })
}
}

export const createAnecdote =  content => {
  return async dispatch => {
    const newAnecdote = await anecdoteServices.createNew(content)
    dispatch({
    type: 'NEW_ANECDOTE',
    data: newAnecdote,
  })
}
}
export const initializeAnecdotes = () => {
  return async dispatch => {
    const data = await anecdoteServices.getAll()
    dispatch({
      'type': 'INIT_ANECDOTE',
      data,
    })
  }
}
export default reducer