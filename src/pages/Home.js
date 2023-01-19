import axios from 'axios'
import React, { useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Home = () => {
  const { user } = useContext(UserContext)

  const loadTodos = async () => {
    try {
      // making request to get the todos
      // const {data} = await axios.get(`http://127.0.0.1:4000/api/getTodos`)
      // console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    loadTodos()
  }, [])

  return (
    <div>{user.email}</div>
  )
}

export default Home