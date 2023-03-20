import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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
    const anecdotes = useSelector(state => {
      if (state.filter === '') {
        return state.anecdotes
      }
      return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
    })
    //console.log("ANEC", anecdotes)
    return (
        <div>
            {anecdotes.sort(compare).map(anecdote =>
            <Anecdote key={anecdote.id}
            anecdote={anecdote}
            vote={() => {dispatch(voteAnecdote(anecdote.id))}}
            />
          )}
        </div>
    )

}

export default AnecdoteList