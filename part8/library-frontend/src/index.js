import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { router } from './App'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  import { setContext } from '@apollo/client/link/context';

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, gql } from '@apollo/client'


const httpLink = createHttpLink({

  uri: 'http://localhost:5000',

});


const authLink = setContext((_, { headers }) => {

  // get the authentication token from local storage if it exists
  const authCookie = localStorage.getItem('userInfo')

  const token = authCookie ? JSON.parse(authCookie).token : ''

  console.log({token})
  // return the headers to the context so httpLink can read them

  return {

    headers: {

      authorization: token ? `Bearer ${token}` : "",

    }

  }

});



export const client = new ApolloClient({
  uri: 'http://localhost:5000',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})



ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
        <RouterProvider router={router} />
    </ApolloProvider>)