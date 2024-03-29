import axios from "axios";
import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const hiddenNavbar = useRef()

  const handleToggle = () =>{
    const hidden = hiddenNavbar.current.classList.contains("hidden") //return true if it contains hidden class
  
    if(hidden){
      hiddenNavbar.current.classList.remove("hidden")
      hiddenNavbar.current.classList.add("block")
    }else{
      hiddenNavbar.current.classList.remove("block")
      hiddenNavbar.current.classList.add("hidden")
    }
  }

  const handleLogout = async () => {
    try {
      setUser(null)
      const { data } = await axios.get(`/api/logout`)
      console.log(data);
      toast(data.message, {
        type: "success",
        position: "bottom-center"
      })

    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link to="/" className="flex items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC6Ek7sy3r7MOGr75ZLJezfZHEqbL5nhDepw&usqp=CAU"
            className="h-8 mr-3 sm:h-12 w-auto rounded-full"
            alt="GitHub Search"
          />
          <span className="mx-3 text-xs sm:text-sm text-white ">
            {user ? user.email : ""}{" "}
            {/*TODO: conditional rendring */}
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={handleToggle}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default" ref={hiddenNavbar}>
          <ul className="flex flex-col p-1 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {user ? (
              <li>
                <button
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to={"/signup"}
                    className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Signup
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/signin"}
                    className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Signin
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
