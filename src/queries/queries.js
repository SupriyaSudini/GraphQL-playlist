import {gql} from '@apollo/client';


const GET_BOOKS_QUERY = gql`
query GetBooks {
    books{
        name
        id
    }
  }
`;

const GET_AUTHORS_QUERY = gql`
query GetAuthors {
    authors{
        name
        id
    }
  }
`;

const ADD_BOOK_MUTATION = gql`

mutation AddBook($name:String!, $genre: String!, $authorId:ID!){
    addBook(name:$name,genre:$genre, authorId:$authorId){
        name
        id
    }
}
`;

const GET_book_QUERY = gql`
  query GetBook($id:ID!){
    book(id:$id){
        id
        name
        genre
        author{
            id
            name
            age
            books{
                name
                id
            }
        }
    }
  }
`;


export {GET_BOOKS_QUERY, GET_AUTHORS_QUERY, ADD_BOOK_MUTATION, GET_book_QUERY};
