import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = personObject => {
    //console.log("body:", request.body)
    console.log("Personobject: ", personObject)
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)
}

const update = (id, personObject) => {
    console.log(`update ${id} ${personObject.name}`)
    const request = axios.put(`${baseUrl}/${id}`, personObject)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const exportObject = { getAll, create, update, remove }

export default exportObject