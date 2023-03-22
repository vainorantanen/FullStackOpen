import { createAnecdote, updateAnecdote } from "../requests"
import { useQuery, useMutation, useQueryClient } from 'react-query'
import AnecdoteContext from '../AnecdoteContext'
import { useReducer } from 'react'
import { notificationReducer } from "../App"
import Notification from "./Notification"

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation( createAnecdote, {
    onSuccess : (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError : () => {
      notificationDispatch({type: "error"})
      setTimeout(() => {
        notificationDispatch({type: 'deletenotification'})
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    notificationDispatch({type: "add", anecdote: content})
    newAnecdoteMutation.mutate({content, votes: 0})
    setTimeout(() => {
      notificationDispatch({type: 'deletenotification'})
    }, 5000)
}

  return (
    <AnecdoteContext.Provider value={[notification, notificationDispatch]}>
      <Notification />
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
    </AnecdoteContext.Provider>
  )
}

export default AnecdoteForm
