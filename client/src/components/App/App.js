import './App.css';
import SiderDemo from '../SiderDemo/SiderDemo';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';


/**
 * Requirements:
 * 1. Create an Anime card component
 *   - Should show title in english and in japanese
 *   - Should show Score
 *   - TitleEnglish, TitleJapanese, and Score should be new rows each
 *   - Should have 12 margin between each card
 *   - Have border around each card
 *   - Have Image as background of each card
 * 2. Render Anime card components for each anime
 *   - Use a for loop to render the created Anime card component
 */

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <SiderDemo></SiderDemo>
      </Router>
    </ApolloProvider>
  );
}

export default App;
