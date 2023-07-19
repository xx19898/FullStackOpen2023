import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { router } from './App'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  import { setContext } from '@apollo/client/link/context';

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  gql,
  split} from '@apollo/client'

  import {getMainDefinition} from '@apollo/client/utilities'
  import {GraphQLWsLink} from '@apollo/client/link/subscriptions'
  import {createClient} from 'graphql-ws'

const authLink = setContext((_, { headers }) => {

  // get the authentication token from local storage if it exists
  const authCookie = localStorage.getItem('userInfo')

  const token = authCookie ? JSON.parse(authCookie).token : ''

  // return the headers to the context so httpLink can read them

  return {

    headers: {

      authorization: token ? `Bearer ${token}` : "",

    }

  }

});

const httpLink = createHttpLink({

  uri: 'http://localhost:5000',

});

const wsLink = new GraphQLWsLink(createClient({  url: 'ws://localhost:5000',}))

const splitLink = split((
  {query}
  ) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
      )
    },
    wsLink,
    authLink.concat(httpLink)
    )


export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})



ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
        <RouterProvider router={router} />
    </ApolloProvider>)