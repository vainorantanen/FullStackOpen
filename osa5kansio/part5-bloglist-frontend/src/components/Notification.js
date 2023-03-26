import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(({ message }) => {
    return message
  })
  
  
  if (notification === '') {
    return (
      <div>

      </div>
    )
  }
  return (
    <div>
      <Alert>
        { notification }
      </Alert>
    </div>
  )
}
export default Notification
