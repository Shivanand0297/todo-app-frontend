import axios from 'axios'
import React, { useEffect } from 'react'

const Home = () => {

  const loadTodos = async () =>{
    try {
      // making request to get the todos
      const {data} = await axios.get(`http://127.0.0.1:4000/api/getTodos`)
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    loadTodos()
  }, [])

  return (
    <div>Home</div>
  )
}

export default Home