import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import SetBirthYear from './SetBirthYear'

const Authors = (props) => {
  const res = useQuery(ALL_AUTHORS)
  
  if (!props.show) {
    return null
  }


  if (res.loading) {
    return <div>loading</div>
  }

  const authors = res.data.allAuthors
  //console.log("AUTHORISSA", authors)
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
      <div>
        <h2>Set Birthyear</h2>
        <SetBirthYear authors={authors}/>
      </div>
    </div>
  )
}

export default Authors