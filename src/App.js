import React from 'react'
import Header from './components/Header'
import "./App.css"
import {Routes, Route} from "react-router-dom"
import CreateTodo from './components/CreateTodo'

const App = () => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/createTodo' element={<CreateTodo/>}/>
      </Routes>
    </div>
  )
}

export default App