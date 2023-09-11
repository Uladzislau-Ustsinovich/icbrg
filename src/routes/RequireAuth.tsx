import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import {useLocation} from 'react-router'
import {ROUTES} from '../constants/routes'

export const RequireAuth = () => {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.signed) {
    return <Navigate to={ROUTES.LOGIN} state={{from: location}} replace />
  }

  return <Outlet />
}
