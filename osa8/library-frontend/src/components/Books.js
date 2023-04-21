import { useQuery } from "@apollo/client"
import { BOOKS, ALL_BOOKS } from "../queries"
import { useState } from "react";

const GenreButtons = ({setGenre}) => {
  const res = useQuery(ALL_BOOKS)
  const genres = []
  
  if (res.loading) {
    return <div>Buttons loading</div>
  }

  const books = res.data.allBooks

  books.forEach(b => {
    b.genres.forEach(gen => {
      genres.push(gen)
    })
  });
  // remove duplicates
  const genresNoDups = Array.from(new Set(genres)).filter(str => str.trim() !== '');
  //console.log(genresNoDups)
  return (
    <div>
      {genresNoDups.map((buttonLabel, index) => (
        <button key={index} onClick={() => setGenre(buttonLabel)}>
          {buttonLabel}
        </button>
      ))}
      <button onClick={() => setGenre('all')}>All</button>
    </div>
  )
}

const Books = (props) => {
  const [genre, setGenre] = useState("all")
  const res = useQuery(BOOKS, {
    variables: { genre },
    skip: !genre
  })

  if (!props.show) {
    return null
  }

  if (res.loading) {
    return <div>Loading</div>
  }
  //console.log(res.data)
  const books = res.data.allBooks;
  //console.log(books)

  return (
    <div>
      <h2>books</h2>

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
      <GenreButtons setGenre={setGenre}/>
    </div>
  )
}

export default Books