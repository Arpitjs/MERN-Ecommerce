import { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterComplete from './pages/auth/RegisterComplete'
import ForgotPassword from './pages/auth/ForgotPassword'
import Home from './pages/Home'
import Header from './components/nav/header'
import { ToastContainer } from "react-toastify"
import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { CreateOrGetUser } from './functions/UserInfo'
import History from './pages/user/History'
import Password from './pages/user/Password'
import Wishlist from './pages/user/Wishlist'
import UserRoute from './components/routes/UserRoute'
import AdminRoute from './components/routes/AdminRoute'
import AdminDashboard from './pages/admin/AdminDashboard'

let App = () => {
  let dispatch = useDispatch()
  //to check firebase auth state
  useEffect(() => {
    let unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        // console.log('USER', user)
        let idTokenResult = await user.getIdTokenResult()
        CreateOrGetUser(idTokenResult, '/current-user')
          .then(response => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                email: response.data.email,
                name: response.data.name,
                token: idTokenResult.token,
                role: response.data.role,
                _id: response.data._id
              }
            })
          })
      }
    })
    return () => unsubscribe()
  }, [dispatch])
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
        <Route exact path="/forgot-password"
          component={ForgotPassword} />
             <UserRoute exact path="/user/history"
          component={History} />
            <UserRoute exact path="/user/change-password"
          component={Password} />
            <UserRoute exact path="/user/wishlist"
          component={Wishlist} />
            <AdminRoute exact path="/admin/dashboard"
          component={AdminDashboard} />
      </Switch>
    </>
  )
}

export default App
