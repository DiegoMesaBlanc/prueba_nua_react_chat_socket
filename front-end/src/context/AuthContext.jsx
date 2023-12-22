import { useContext, useState, createContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import { loginRequest, registerRequest, verifyTokenRequest } from '../api/auth'

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [errors, setErrors] = useState([])

  const signup = async (user) => {
    try {
      const res = await registerRequest(user)
      setUser(res.data)
      setIsAuthenticated(true)
    } catch (error) {
      setErrors(error.response.data.error)
    }
  }

  const signin = async (user) => {
    try {
      const res = await loginRequest(user)
      setUser(res.data)
      setIsAuthenticated(true)
    } catch (error) {
      setErrors(error.response.data.error)
    }
  }

  const logout = () => {
    Cookies.remove('token')
    setIsAuthenticated(false)
    setUser(null)
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [errors])

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get()

      if (!cookies.token) {
        setIsAuthenticated(false)
        setUser(null)
        return
      }

      try {
        const res = await verifyTokenRequest()

        setIsAuthenticated(true)
        setUser(res.data)
      } catch (error) {
        setIsAuthenticated(false)
        setUser(null)
      }
    }

    checkLogin()
  }, [])

  return (
    <AuthContext.Provider
      value={{ signup, user, isAuthenticated, errors, signin, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
