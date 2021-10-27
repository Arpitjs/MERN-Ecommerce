import { Switch, Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterComplete from './pages/auth/RegisterComplete'
import Home from './pages/Home'
import Header from './components/nav/header'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'antd/dist/antd.css'

let App = () => {
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
