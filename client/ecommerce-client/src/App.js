import { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterComplete from './pages/auth/RegisterComplete'
import ForgotPassword from './pages/auth/ForgotPassword'
import Home from './pages/Home'
import Header from './components/nav/header'
import { toast, ToastContainer } from "react-toastify"
import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { CreateOrGetUser } from './functions/UserInfo'
import History from './pages/user/History'
import Password from './pages/user/Password'
import Wishlist from './pages/user/Wishlist'
import UserRoute from './components/routes/UserRoute'
import AdminRoute from './components/routes/AdminRoute'
import AdminDashboard from './pages/admin/AdminDashboard'
import CategoryCreate from './pages/admin/category/CategoryCreate'
import CategoryUpdate from './pages/admin/category/CategoryUpdate'
import subCreate from './pages/admin/sub/subCreate'
import subUpdate from './pages/admin/sub/SubUpdate'
import ProductCreate from './pages/admin/product/ProductCreate'
import AllProducts from './pages/admin/product/AllProducts'
import ProductUpdate from './pages/admin/product/productUpdate';
import Product from './pages/Product';

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
          .catch(err => console.log(err));
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
           <Route exact path="/product/:slug"
          component={Product} />
          
             <UserRoute exact path="/user/history"
          component={History} />
            <UserRoute exact path="/user/change-password"
          component={Password} />
            <UserRoute exact path="/user/wishlist"
          component={Wishlist} />
            <AdminRoute exact path="/admin/dashboard"
          component={AdminDashboard} />
            <AdminRoute exact path="/admin/category"
          component={CategoryCreate} />
             <AdminRoute exact path="/admin/category/:slug"
          component={CategoryUpdate} />
          <AdminRoute exact path="/admin/sub"
          component={subCreate} />
            <AdminRoute exact path="/admin/sub/:slug"
          component={subUpdate} />
            <AdminRoute exact path="/admin/product"
          component={ProductCreate} />
           <AdminRoute exact path="/admin/products"
          component={AllProducts} />
           <AdminRoute exact path="/admin/product/:slug"
          component={ProductUpdate} />
      </Switch>
    </>
  )
}

export default App
