import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import Cursos from './pages/cursos'
import Estudiantes from './pages/estudiantes'
import Matriculas from './pages/matriculas'
import Layout from './components/layout'
import { getToken } from './configs/credentials'
import * as authActions from './redux/actions/auth'

function MainRouter() {
   const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()
  
    const userAuthenticated = auth.authenticated.data
  
    const PrivateRoute = (props) => {
      if (userAuthenticated) {
        return <Route {...props} />
      }
      return <Redirect to='/login' />
    }
  
    useEffect(() => {
      const token = getToken()
      console.log(userAuthenticated)
      if (token) {
       dispatch(authActions.doMenu())
      }
    }, [userAuthenticated]) 
  
    return (
      <Router>
        <Layout>
          <Switch>

          <Route exact path='/' component={() => <Redirect to={userAuthenticated ? '/home' : '/login'} />} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/home' component={Home} />
            <PrivateRoute exact path='/estudiantes' component={Estudiantes} />
            <PrivateRoute exact path='/cursos' component={Cursos} />
            <PrivateRoute exact path='/matriculas' component={Matriculas} />
            <PrivateRoute exact component={() => <h1>Not Found 404</h1>} />
            
          </Switch>
        </Layout>
      </Router>
    )
  }
  
  export default MainRouter