import { useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, SET_BIRTH } from "../queries"
import Select from 'react-select'

const SetBirthYear = ({authors}) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  const [ SetBirth ] = useMutation(SET_BIRTH, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  const submit = async (event) => {
    event.preventDefault()
    if (!name || !born) return
    const setBornTo = Number(born)
    SetBirth({variables: {nimi: name.value, setBornTo}})
    setName(null)
    setBorn('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          author
          <Select
            options={authors.map(author => ({ value: author.name, label: author.name }))}
            onChange={setName}
            value={name}
            required
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
            required
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default SetBirthYear