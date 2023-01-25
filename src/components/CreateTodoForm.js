import React, { useState } from "react";
import axios from "axios";



const CreateTodoForm = () => {

  // storing and updating title and tasks
  const [todoTitle, setTodoTitle] = useState(undefined)
  const [todoTask, setTodoTask] = useState(undefined)

  // function htmlFor creating todos
  const createTodo = async () => {
    if (!todoTitle) {
      return alert("Please Enter Title")
    }
    const todo = {
      title: todoTitle,
      task: todoTask
    }
    console.log(`title: ${todoTitle} task: ${todoTask}`);
    // sending data to backend with the help of axios
    // "proxy": "http://127.0.0.1:4000",

    const res = await axios.post("/api/createTodo", todo)
    console.log(res);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo();
    setTodoTitle("")    //undefined
    setTodoTask("")     //undefined
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-8 mx-auto">
            <div className="flex flex-col text-center w-full mb-6">
              <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-800">
                Your Todos
              </h1>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="title"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={todoTitle}
                      onChange={e => setTodoTitle(e.target.value)}
                      className="w-full bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="task"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Task
                    </label>
                    <input
                      type="task"
                      id="task"
                      name="task"
                      value={todoTask}
                      onChange={e => setTodoTask(e.target.value)}
                      className="w-full bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button
                    type="submit"
                    className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Create Todo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  )
}

export default CreateTodoForm