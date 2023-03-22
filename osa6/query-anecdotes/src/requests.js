import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

  export const createAnecdote = (newAnecdote) => {
      console.log("NEWANEC", newAnecdote)
      if (newAnecdote.content.lenght < 5) {
        return {error: 'errormes'}
      } else {
      const req = axios.post(baseUrl, newAnecdote)
      //console.log("DATA", req.then(res => res.data))
      return req.then(res => res.data)
      } 
  }

  export const updateAnecdote = updatedAnecdote =>
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)