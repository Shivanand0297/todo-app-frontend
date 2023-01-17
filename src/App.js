import React, { useState } from 'react'
import Header from './components/Header'
import {BrowserRouter ,Routes, Route} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

// import CreateTodo from './components/CreateTodo'
// import CreateTodoForm from './components/CreateTodoForm'
// import TodosList from './components/TodosList'
import "./App.css"
import { UserContext } from './context/UserContext'
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import PageNotFound from "./pages/PageNotFound"

const App = () => {

  const [user, setUser] = useState(null)  // to store the logged in user

  return (
    <BrowserRouter>
    <UserContext.Provider value={{user, setUser}} >
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      {/* <CreateTodoForm/>
      <TodosList/> */}
      <ToastContainer/>
    </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App