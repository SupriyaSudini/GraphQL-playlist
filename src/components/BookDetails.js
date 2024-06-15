import React from 'react';

// to write the query whcih is understandable by js - gql
// bind the query with react component - useQuery graphql
import { useQuery} from '@apollo/client';
import { GET_book_QUERY} from '../queries/queries';

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(GET_book_QUERY, {
    variables: { id: bookId },
    skip: !bookId,
  });

  if (!bookId) return <p>No book selected</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const book = data?.book;

  if (!book) return <p>No book details available</p>;

  return (
    <div id="book-detail">
      <h2>{book.name}</h2>
      <p>Genre: {book.genre}</p>
      <p>Author: {book.author.name}</p>
      <p>All books by this author:</p>
      <ul>
        {book.author.books.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookDetails