import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useAuthContext} from './contexts/AuthContext'

const RedirectToLogin = () => <Redirect to="/" />

const AuthenticatedRoute = (props) => {
  const {user} = useAuthContext()


  return (
    <Route {...props} component={user ? props.component : RedirectToLogin} />
  )
}

export default AuthenticatedRoute
