import axios from 'axios'
const baseUrl = '/api/users'

const getAllUsers = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default getAllUsers