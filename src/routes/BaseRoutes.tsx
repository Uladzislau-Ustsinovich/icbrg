import React from 'react'
import {Layout} from '../components'
import {Main, Login, NotFound} from '../pages'
import {ROUTES} from '../constants/routes'
import {RequireAuth} from './RequireAuth'
import {Routes, Route} from 'react-router-dom'
import {useAxios} from '../hooks/useAxios'

export const BaseRoutes = () => {
  useAxios()

  return (
    <Routes>
      <Route path={ROUTES.BASE} element={<Layout />}>
        <Route element={<RequireAuth />}>
          <Route index element={<Main />} />
        </Route>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.ALL} element={<NotFound />} />
      </Route>
    </Routes>
  )
}
