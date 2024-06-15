import React, {useState} from 'react';

// to write the query whcih is understandable by js - gql
// bind the query with react component - useQuery graphql
import { useQuery} from '@apollo/client';
import { GET_BOOKS_QUERY } from '../queries/queries';
import BookDetails from './BookDetails';



const BookList = () => {
    // console.log(this.props);
    // use the useQuery hook to fetch the data

    const [selectedId, setSelectedId] = useState(null);
    const {loading, error, data} = useQuery(GET_BOOKS_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul id="book-list">
      
           {data.books.map((book) => (
              <li key ={book.id} onClick={() => setSelectedId(book.id)}>
                {book.name}
              </li>
           ))}
       
      </ul>
      {selectedId ? (
        <BookDetails bookId={selectedId} />
      ) : (
        <p>No Book is selected...</p>
      )}
          </div>
  )
}

// binding the query using graphql to component
export default BookList;
