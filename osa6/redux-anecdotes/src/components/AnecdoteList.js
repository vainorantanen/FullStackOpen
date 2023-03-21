import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({anecdote, vote}) => {
    return (
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
    )
}

function compare( a, b ) {
    if ( a.votes > b.votes ){
      return -1
    }
    if ( a.votes < b.votes ){
      return 1
    }
    return 0
  }



const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ filter, anecdotes }) => {
      if (filter === '') {
        return anecdotes
      }
      return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    })

    const voteThisAnecdote = (anecdote) => {
      dispatch(voteAnecdote(anecdote))
      dispatch(setNotification(`You voted "${anecdote.content}"`, 5))
    }
    return (
        <div>
            {anecdotes.slice().sort(compare).map(anecdote =>
            <Anecdote key={anecdote.id}
            anecdote={anecdote}
            vote={() => {voteThisAnecdote(anecdote)}}
            />
          )}
        </div>
    )

}

export default AnecdoteList