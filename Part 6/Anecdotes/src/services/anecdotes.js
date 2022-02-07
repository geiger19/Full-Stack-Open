import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const createNew = async (content) => {
  const object = { content, 'votes': 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}
const addVote = async (id) => {
  const { data: Anecdote } = await axios.get(`${baseUrl}/${id}`)
  const response = await axios.patch(`${baseUrl}/${id}`, {
    votes: Anecdote.votes + 1,
  })
  return response.data
}


const anecdoteServices = {getAll,  createNew, addVote,}
export default anecdoteServices