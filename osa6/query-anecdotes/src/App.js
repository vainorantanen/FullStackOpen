import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes } from './requests'
import { updateAnecdote } from './requests'
import AnecdoteContext from './AnecdoteContext'
import { useReducer } from 'react'

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'vote':
      return `You voted "${action.anecdote.content}"`
    case 'deletenotification':
      return ''
    case 'add':
      console.log("A", action)
      return `You added anecdote "${action.anecdote}"`
    case 'error':
      return 'Anecdote is too short, must have length 5 or more'
    default:
      return ''
  }
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')
  const queryClient = useQueryClient()

  const handleVote = (anecdote) => {
    //console.log("A", anecdote)
    notificationDispatch({type: "vote", anecdote: anecdote})
    const votet = anecdote.votes+1
    console.log('vote')
    updateAnecdoteMutation.mutate({...anecdote, votes : votet})
    setTimeout(() => {
      notificationDispatch({type: 'deletenotification'})
    }, 5000)
  }

  const updateAnecdoteMutation = useMutation( updateAnecdote, {
    onSuccess : () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const result = useQuery(
    'anecdotes', getAnecdotes, 
    {
      retry: false
    }
  )
    
  if (result.status === 'loading') {
    return <div>Loading data...</div>
  }

  if (result.status === 'error') {
    return <div>Anecdote servive not available due to problems in server</div>
  }
  console.log("R", result)
  return (
    <AnecdoteContext.Provider value={[notification, notificationDispatch]} >
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {result.data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    </AnecdoteContext.Provider>
  )
}

export default App
