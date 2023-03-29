import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, SET_BIRTH } from '../queries'
//import AuthorBirth from './AuthorBirth'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

const Authors = (props) => {
  const [name, setName] = useState({})
  const [year, setYear] = useState('')
  const [ editAuthor ] =  useMutation(SET_BIRTH, {
    refetchQueries: [ {query : ALL_AUTHORS} ]
  })

  const hanleSubmit = async (event) => {
    event.preventDefault()
    var setBornTo = parseInt(year)
    console.log("TÄS NIMI", name)
    console.log(name.value, setBornTo)
    const nimi = name.value
    editAuthor({variables: { nimi, setBornTo }})

    setName('')
    setYear('')
}

  const result = useQuery(ALL_AUTHORS)
  if (result.loading)  {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors

  if (!props.show) {
    return null
  }

  const options = (authors) => {
    var lista = []
    authors.forEach(element => {
      lista.push({ value: element.name, label : element.name})
    });
    console.log(lista)
    return lista
  } 
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
        <form onSubmit={hanleSubmit}>
          <div>
          <Select options={options(authors)}
            onChange={setName}
          />
          </div>
            <div>
                born
                <input
                    value={year}
                    onChange={({target}) => setYear(target.value)}
                />
            </div>
            <button type='submit'>Update author</button>
        </form>
    </div>
  )
}

export default Authors
