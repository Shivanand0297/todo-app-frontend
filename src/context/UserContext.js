import { createContext, useState,useEffect } from "react";
export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('user'))
        setUser(token)
    }, [])
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}