import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ message }) => {
    return message
  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  if (notification === '') {
    return (
      <div>

      </div>
    )
  }
  return (
    <div style={style}>
      { notification }
    </div>
  )
}
export default Notification
