import axios from 'axios'
import React, { useState, useEffect } from 'react'

const TodosList = () => {

    const [todoList, setTodoList] = useState("")
    
    const fetchTodos = async () =>{
        const resp = await axios.get("/getTodos")
        console.log(resp);
        if (resp.data.todos.length > 0){
            setTodoList(resp.data.todos)
          }
    }

  // to load the already present data at reload
  useEffect(()=>{
    fetchTodos()
  }, [todoList])

  const handleEdit = async (todo) =>{
    let newTitle, newTask;
    
    if(window.confirm("Do you want to update the title")){
        newTitle = prompt("Enter new title")
        if(!newTitle){
            alert("Please Enter a valid Title")
            newTitle = todo.title;    
        }
    }else{
        newTitle = todo.title;
    }
    if(window.confirm("Update task, if not press cancel")){
        newTask = prompt("update Task")
        if(!newTask){
            alert("Please Enter a valid task")
            newTitle = todo.task;    
        }
    }else{
        newTask = todo.task;
    }

    const res = await axios.put(`/editTodo/${todo._id}`, {
        title: newTitle, 
        task: newTask
    })
  }

  const handleDelete = async (todo)=>{
    if(window.confirm("Confirm delete")){
        await axios.delete(`/deleteTodo/${todo._id}`)
    }return;
  }

  return (
    <div>
        <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-8">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            All todos
          </h1>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Title
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Task
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Edit
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {todoList && todoList.map(todo=>(
                <tr>
                <td className="px-4 py-3">{todo.title}</td>
                <td className="px-4 py-3">{todo.task}</td>
                <td className="px-4 py-3">
                  <button 
                  className="hover:text-green-500"
                  onClick={()=>{handleEdit(todo)}}
                  >Edit</button>
                </td>
                <td className="px-4 py-3 text-lg text-gray-900">
                  <button 
                  className="hover:text-red-500"
                  onClick={()=>{handleDelete(todo)}}
                  >Delete</button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
    </div>
  )
}

export default TodosList