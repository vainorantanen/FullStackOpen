import { useContext } from 'react'
import AnecdoteContext from '../AnecdoteContext'

const Notification = () => {
  const [notification, dispatch] = useContext(AnecdoteContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notification === '') return (
    <div></div>
  )

  return (
    <div style={style}>
      {notification}  
    </div>
  )
}

export default Notification
