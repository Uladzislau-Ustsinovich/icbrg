import './styles.css'

import React, {useState} from 'react'
import {useLocation, useNavigate} from 'react-router'
import {useAuth} from '../../context/AuthContext'
import {Button} from '../../components'

const Login = () => {
  const [error, setError] = useState<boolean>(false)

  const {signIn} = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const from = location.state?.from?.pathname || '/'

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    event.stopPropagation()

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    signIn(username, password, (success) => {
      if (success) {
        return navigate(from, {replace: true})
      }

      setError(true)
    })
  }

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name='username' type='text' required />
        </label>
        <label>
          Password: <input name='password' type='password' required />
        </label>
        <Button label='Log in' type='submit' />
        {error && <p>Something went wrong... Try one more time.</p>}
      </form>
    </div>
  )
}

export default Login
