
import BookList from './components/BookList';
import AddBook from './components/AddBook';

import {ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


// apollo setup
const client = new ApolloClient({
  uri:"http://localhost:4000/graphql",
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>   
      <div id="main">
       <h1>Supriya's Reading List</h1>
       <BookList />
       <AddBook />
    </div>
    </ApolloProvider>
 
  
  );
}

export default App;
