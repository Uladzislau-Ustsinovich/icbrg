import {useEffect} from 'react'
import {AUTH_LOCAL_STORAGE_KEYS} from '../constants/auth'
import api from '../api/auth'
import axios from '../utils/axios'
import {useAuth} from '../context/AuthContext'
import {AUTH} from '../constants/endpoints'

export const useAxios = () => {
  const {signOut} = useAuth()

  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(AUTH_LOCAL_STORAGE_KEYS.TOKEN)
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        if (
          error.response.status === 401 &&
          originalRequest.url === AUTH.REFRESH
        ) {
          return signOut()
        }

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          try {
            const refreshToken = localStorage.getItem(
              AUTH_LOCAL_STORAGE_KEYS.REFRESH_TOKEN
            )
            const response = await api.refresh(refreshToken)
            const {access_token} = response.data

            localStorage.setItem(AUTH_LOCAL_STORAGE_KEYS.TOKEN, access_token)

            originalRequest.headers.Authorization = `Bearer ${access_token}`
            return await axios(originalRequest)
          } catch (error) {
            signOut()
          }
        }

        return Promise.reject(error)
      }
    )
  }, [])
}
