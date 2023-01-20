import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserContext'

const SignIn = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  console.log(useContext(UserContext));

  const setData = async () => {

    try {
      const userData = {
        email: email,
        password: password
      }
      console.log(email)
      const response = await axios.post("http://127.0.0.1:4000/api/login", userData, {
        credentials: 'include'
      })
      const data = await response.data
      const loggedInEmail = data.user.email
      const userId = data.user._id
      if (data.success) {
        setUser({
          ...user, email: loggedInEmail, id: userId
        })
        toast(data.message, {
          type: "success",
          position: "bottom-center"
        })
        setTimeout(() => {
          return navigate('/')
        }, 1000)
      } else {
        toast(data.message, {
          type: "error",
          position: "bottom-center"
        })
      }
    } catch (error) {
      console.log(error.message);
      toast(`Failed to signin: ${error.message}`, {
        type: "error",
        position: "bottom-center"
      })
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setData()
    setEmail("")
    setPassword("")
  }


  // putting behind login screen
  if (user) {
    return navigate("/")
  }

  return (
    <>
      {/* <!-- Main modal --> */}
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="flex items-center justify-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
      >
        <div className="relative w-full h-full max-w-md md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <Link
              to={"/"}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="authentication-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </Link>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Signin to your account
              </h3>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleSubmit}
                >
                  Signin
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn