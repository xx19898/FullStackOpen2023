import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import { anecdoteReducer, anecdoteSlice } from './slices/anecdoteSlice'
import { filterReducer, filterSlice } from './slices/filterSlice'
import { notificationReducer } from './slices/notificationSlice'

const store = configureStore({reducer:{filter:filterReducer,anecdotes:anecdoteReducer,notification:notificationReducer}})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)