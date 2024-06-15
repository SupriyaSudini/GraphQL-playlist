import React, {useState} from 'react';

// to write the query whcih is understandable by js - gql
// bind the query with react component - useQuery graphql
import {useQuery, useMutation} from '@apollo/client';
import { GET_AUTHORS_QUERY, ADD_BOOK_MUTATION, GET_BOOKS_QUERY} from '../queries/queries';


const AddBook = () => {

// State variables for form fields
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

 // Use the useMutation hook to bind the mutation

 const[addBook, {loading:mutationLoading, error:mutationError}] = useMutation(ADD_BOOK_MUTATION);

    // // console.log(this.props);
    // // use the useQuery hook to fetch the data
    const {loading, error, data} = useQuery(GET_AUTHORS_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    // handle submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log({name, genre, authorId});

        addBook({
            variables:{
                name,
                genre,
                authorId
            },
            refetchQueries: [{query: GET_BOOKS_QUERY}]   // Refetch the authors query after the mutation

        }).then((e) => {
            setName('');
            setGenre('');
            setAuthorId('');
        }).catch(err => {
            console.error("Error adding book: ", err);
        });
    }

  return (
    <form id="add-book" onSubmit={handleSubmit} >

      <div className='field'>
        <label>Book Name: </label>
        <input type="text" 
          value={name}
          onChange = {(e) => setName(e.target.value)}
        />
      </div>
       
      <div className='field'>
        <label>Genre: </label>
        <input type="text"
         value={genre}
         onChange = {(e) => setGenre(e.target.value)}
        />
      </div>

      <div className='field'>
        <label>Author: </label>
        <select
          value={authorId}
          onChange={(e)=> setAuthorId(e.target.value)}
         >
         <option value="">Select author</option>
            {data.authors.map((author) => (
                <option key={author.id} value={author.id}>{author.name}</option>
            ))}
            
        </select>
      </div>
    
     <button type="submit">+</button>

     {mutationLoading && <p>Adding Book.........</p>}
     {mutationError && <p>Error Adding Book {mutationError.message}</p>}

    </form>
  )
}

// binding the query using graphql to component
export default AddBook;

