import React from 'react'
import AuthenticatedRoute from './AuthenticatedRoute'
import {Redirect, Route, Switch} from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
// import Home from './components/Layouts/Home/Home'
import {useAuthContext} from './contexts/AuthContext'
import Login from './components/Layouts/Login/Login'
import Register from './components/Layouts/Register/Register'
import MyInfo from './components/Users/Guest/MyInfo'
import NewBiopsy from './components/NewBiopsy/NewBiopsy'
import Patients from './components/Patients/Patients'
import NewPatient from './components/NewPatient/NewPatient'
import UpdatePassword from './components/Layouts/UpdatePassword/UpdatePassword'
import NewBlog from './components/NewBlog/NewBlog'
import Home from './components/Layouts/Home/Home'
import BlogSingle from './components/Layouts/BlogSingle/BlogSingle'
import NotFoundPage from './components/Layouts/NotFoundPage/NotFoundPage'
import PatientHistory from './components/Layouts/PatientHistoryPage/PatientHistory'
import Casos from './components/Layouts/Casos/Casos'

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
        <Route exact path='/blog' render={(props) => <BlogSingle {...props} confirmed />} />
        <AuthenticatedRoute exact path="/casos" render={(props) => <Casos {...props} user={user} />} />
        <AuthenticatedRoute exact path="/pacientes" render={(props) => <Patients {...props} user={user} />} />
        <AuthenticatedRoute exact path="/biopsias" render={(props) => <MyInfo {...props} user={user} />} />
        <AuthenticatedRoute exact path="/update-password" render={(props) =>
          <UpdatePassword {...props} user={user} />} />
        <AuthenticatedRoute exact path="/nueva-biopsia" render={(props) => <NewBiopsy {...props} user={user} />} />
        <AuthenticatedRoute exact path="/nuevo-paciente" render={(props) => <NewPatient {...props} user={user} />} />
        <AuthenticatedRoute exact path="/historia-paciente" render={(props) => <PatientHistory {...props} user={user} />} />
        <AuthenticatedRoute exact path="/nuevo-blog" render={(props) => <NewBlog {...props} user={user} />} />
        <Route path="*" render={() => <NotFoundPage />} />
        {!user && <Redirect to='/login' />}
      </Switch>
      <Footer />
    </div>
  )
}

export default App
