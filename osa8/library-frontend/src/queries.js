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

export const BOOKS = gql`
query getBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) { 
      title 
      author {
        name
      }
      published 
      genres
    }
  }
`

export const ALL_BOOKS = gql`
query {
    allBooks { 
      title 
      author {
        name
      }
      published 
      genres
    }
  }
`


export const ADD_BOOK = gql`
mutation createBook($title: String!, $author: String!, $pub: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $pub,
      genres: $genres
    ) {
      title
      author {
        name
      }
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`