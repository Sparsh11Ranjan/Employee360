import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'

const userContext = createContext()
const AuthContext = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const verifyUser = async () => {
        try {
          const token = localStorage.getItem("token");
          if (token) {
            const response = await axios.get("http://localhost:5000/api/auth/verify", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (response.data.success) {
              setUser(response.data.user);
            } else {
              setUser(null);
            }
          } else {
            setUser(null);
          }
        } catch (error) {
          console.log("Error verifying user:", error);
          setUser(null);
        } finally {
          setLoading(false);
        }
  };

  verifyUser();
}, []);


    const login = (user) => {
        setUser(user)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("token")
    };
  return (
    <userContext.Provider value={{user, login, logout, loading}}>
        {children}
    </userContext.Provider>
  )
}

export const useAuth =() => useContext(userContext)
export default AuthContext