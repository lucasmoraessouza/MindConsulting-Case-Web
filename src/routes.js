import React from 'react'
import Login from './views/pages/Login'
import Register from './views/pages/Register'
import TableDashboard from './views/pages/TableDashboard'
import FormAdmin from './views/pages/FormAdmin'
import FormUser from './views/pages/FormUser'
import Home from './views/pages/Home'

import { isAuthenticated } from './services/auth'
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
)

export const routes = {
  public: [
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/register',
      component: Register,
    },
  ],
  admin: [
    {
      title: 'Home',
      path: '/dashboard/home',
      component: Home,
    },
    {
      title: 'Usuários',
      path: '/dashboard/listar',
      component: TableDashboard,
    },
    { path: '/dashboard/editar', component: FormAdmin },
  ],
  user: [
    {
      title: 'Home',
      path: '/dashboard/home',
      component: Home,
    },
    {
      title: 'Perfil',
      path: '/dashboard/perfil',
      component: FormUser,
    },
  ],
}
