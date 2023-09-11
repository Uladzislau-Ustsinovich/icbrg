import axios from '../utils/axios'
import {AuthResponse} from '../types/auth'
import {AUTH} from '../constants/endpoints'

export default {
  signIn: (email: string, password: string) =>
    axios.post<AuthResponse>(AUTH.LOGIN, {email, password}),
  refresh: (refreshToken: string) =>
    axios.post<AuthResponse>(AUTH.REFRESH, {
      refresh_token: refreshToken
    })
}
