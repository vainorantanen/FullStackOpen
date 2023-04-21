import React from 'react'
import { useQuery } from '@apollo/client'
import { ME, BOOKS } from '../queries'
import Books from './Books'

const RecomTable = ({genre}) => {
    const res = useQuery(BOOKS, {
        variables: { genre },
        skip: !genre
      })

      if (res.loading) {
        return <div>loading</div>
      }
    
      const books = res.data.allBooks

    return (
        <div>
            <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    )
}

const Recommended = ({show}) => {
    const resMe = useQuery(ME)

    if (!show) {
        return null
    }

    if (resMe.loading) {
        return <div>loading</div>
      }
    
    const myinfo = resMe.data.me
    const genre = myinfo.favoriteGenre
    
    return (
        <div>
            <h2>Recommendations</h2>
            <p>Books in your favorite genre {genre}</p>
            <RecomTable genre={genre}/>
        </div>
    )
}

export default Recommended