import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setMessage, hideMessage } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnec = async (event) => {
        event.preventDefault()
        const content = event.target.anec.value
        event.target.anec.value = ''
        dispatch(createAnecdote(content))
        dispatch(setMessage(`Added a new anecdote "${content}" successfully`))
        setTimeout(() => {
          dispatch(hideMessage())
        }, 5000)
      }

    return (
    <form onSubmit={addAnec}>
        <div><input name='anec'/></div>
        <button type='submit'>create</button>
      </form>
    )
}

export default AnecdoteForm