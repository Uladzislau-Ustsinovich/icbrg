import {createContext, ReactNode, useContext, useState} from 'react'
import {AUTH_LOCAL_STORAGE_KEYS} from '../constants/auth'
import api from '../api/auth'
import {useNavigate} from 'react-router'
import {ROUTES} from '../constants/routes'

interface AuthContextType {
  signed: boolean
  signIn: (
    user: string,
    password: string,
    callback: (success: boolean) => void
  ) => void
  signOut: VoidFunction
}

export const AuthContext = createContext<AuthContextType>(null!)

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const tokenExists = !!localStorage.getItem(AUTH_LOCAL_STORAGE_KEYS.TOKEN)

  const [signed, setSigned] = useState<boolean>(tokenExists)

  const navigate = useNavigate()

  const signIn = (
    user: string,
    password: string,
    callback: (success: boolean) => void
  ) => {
    return api
      .signIn(user, password)
      .then((response) => {
        const {access_token, refresh_token} = response.data

        setSigned(true)
        localStorage.setItem(AUTH_LOCAL_STORAGE_KEYS.TOKEN, access_token)
        localStorage.setItem(
          AUTH_LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
          refresh_token
        )

        callback(true)
      })
      .catch((error) => {
        console.error(error)
        callback(false)
      })
  }

  const signOut = (): void => {
    setSigned(false)
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEYS.TOKEN)
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEYS.REFRESH_TOKEN)
    navigate(ROUTES.LOGIN)
  }

  const value = {signed, signIn, signOut}

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
