import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { router } from './App'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import { ApolloClient, ApolloProvider, InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})



ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
        <RouterProvider router={router} />
    </ApolloProvider>)