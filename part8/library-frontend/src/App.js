
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/newBook/NewBook'
import './App.css'
import { gql, useQuery } from '@apollo/client'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { Navigation } from './components/Navigation/Navigation'
import {
  createBrowserRouter,
} from "react-router-dom";
import SetBirth from './components/setYearOfBirth/SetBirth'
const ALL_AUTHORS = gql`
  query {
    totalAuthors{
      name
      id
      born
    }
  }`

const Root = () => {
  const {data} = useQuery(ALL_AUTHORS)

  return (
    <div className="main">
      <Navigation />
      <Books />
    </div>
  )
}
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
  },
  {
    path: "/authors",
    element: 
    <>
    <Navigation/>
    <Authors/>
    </>
  },
  {
    path:'/books',
    element:
    <>
    <Navigation />
    <Books />
    </>
  },
  {
    path:'/newbook',
    element:
    <>
    <Navigation />
    <NewBook />
    </>
  },
  {
    path: '/setbirthdate',
    element:
    <>
    <Navigation />
    <SetBirth />
    </>
  }
]);

