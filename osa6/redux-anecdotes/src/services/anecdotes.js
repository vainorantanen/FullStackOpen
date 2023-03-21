import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const object = { content, votes : 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
  }

const update = async (anecdote) => {
  const obj = {
    content: anecdote.content,
    id: anecdote.id,
    votes: anecdote.votes+1
  }
  const req = await axios.put(`${baseUrl}/${anecdote.id}`, obj)
  return req.data
}
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default { getAll, createNew, update }
