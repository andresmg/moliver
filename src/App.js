import React from 'react'
import AuthenticatedRoute from './AuthenticatedRoute'
import {Redirect, Route, Switch} from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Home from './components/Layouts/Home/Home'
import {useAuthContext} from './contexts/AuthContext'
import Login from './components/Layouts/Login/Login'
import Register from './components/Layouts/Register/Register'
import MyInfo from './components/Users/Guest/MyInfo'
import NewBiopsy from './components/NewBiopsy/NewBiopsy'
import Patients from './components/Patients/Patients'
import NewPatient from './components/NewPatient/NewPatient'
import UpdatePassword from './components/Layouts/UpdatePassword/UpdatePassword'

function App() {

  const {user} = useAuthContext()

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" login component={Login} />
        <Route exact path="/register" login component={Register} />
        <Route exact path='/activate/:token' render={(props) => <Login {...props} confirmed />} />
        <AuthenticatedRoute exact path="/pacientes" render={(props) => <Patients {...props} user={user} />} />
        <AuthenticatedRoute exact path="/mi-info" render={(props) => <MyInfo {...props} user={user} />} />
        <AuthenticatedRoute exact path="/update-password" render={(props) => 
        <UpdatePassword {...props} user={user} />} />
        <AuthenticatedRoute exact path="/nueva-biopsia" render={(props) => <NewBiopsy {...props} user={user} />} />
        <AuthenticatedRoute exact path="/nuevo-paciente" render={(props) => <NewPatient {...props} user={user} />} />
        {/* {user && <Redirect to='/mi-info' />} */}
        {!user && <Redirect to='/login' />}
      </Switch>
      <Footer />
    </div>
  )
}

export default App
