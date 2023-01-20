import React, { useContext } from 'react'
import Header from './components/Header'
import { Routes, Route, Navigate } from "react-router-dom"
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
  const { user, setUser } = useContext(UserContext)
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to="/signup" />} />
        <Route path='/signup' element={!user ? <SignUp /> : <Navigate to="/" />} />
        <Route path='/signin' element={!user ? <SignIn /> : <Navigate to="/" />} />
        <Route path='*' element={user ? <PageNotFound /> : <Navigate to="/" />} />
      </Routes>
      {/* <CreateTodoForm/>
      <TodosList/> */}
      <ToastContainer />
    </>
  )
}

export default App