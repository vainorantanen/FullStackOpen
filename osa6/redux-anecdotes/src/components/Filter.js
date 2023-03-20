import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
      // input-kentän arvo muuttujassa event.target.value
      //console.log(event.target.value)
      dispatch(filterChange(event.target.value))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input type='text' name='filter' onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter