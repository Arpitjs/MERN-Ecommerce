import { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterComplete from './pages/auth/RegisterComplete'
import Home from './pages/Home'
import Header from './components/nav/header'
import { ToastContainer } from "react-toastify"
import { auth } from './firebase'
import { useDispatch } from 'react-redux'

let App = () => {
  let dispatch = useDispatch()
  //to check firebase auth state
  useEffect(() => {
    let unsubscribe = auth.onAuthStateChanged(async user => {
      if(user) {
        console.log('USER', user)
        let idTokenResult = await user.getIdTokenResult()
        dispatch({ 
          type: 'LOGGED_IN_USER', 
          payload: {
            email: user.email,
            token: idTokenResult.token
          }
        })
      }
    })
    return () => unsubscribe()
  }, [])
  return (
    <>
    <Header />
    <ToastContainer />
    <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/Login" component={Login} />
    <Route exact path="/Register" component={Register} />
    <Route exact path="/Register/complete" 
    component={RegisterComplete} />
  </Switch>
    </>
  )
}

export default App
