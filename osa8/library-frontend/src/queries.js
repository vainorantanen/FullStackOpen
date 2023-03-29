import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
    allAuthors {
        name
        id
        born
        bookCount
    }
}
`

export const ALL_BOOKS = gql`
query {
    allBooks { 
      title 
      author
      published 
      genres
    }
  }
`

export const ADD_BOOK = gql`
mutation createBook($title: String!, $author: String!, $p: Int!, $genres: [String]) {
    addBook(
      title: $title,
      author: $author,
      published: $p,
      genres: $genres
    ) {
      title,
      author
    }
  }
`

export const SET_BIRTH = gql`
  mutation editAuthor($nimi: String!, $setBornTo: Int!) {
    editAuthor(name: $nimi, setBornTo: $setBornTo) {
      name
      born
    }
  }
`