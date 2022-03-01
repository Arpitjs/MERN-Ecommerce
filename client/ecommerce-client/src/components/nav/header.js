import React, { useState } from 'react'
import { Menu } from 'antd'
import firebase from 'firebase'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
    AppstoreOutlined, 
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
    LogoutOutlined,
    ShoppingOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Search from '../Forms/Search';

let { SubMenu, Item } = Menu

let Header = () => {
    let [current, setCurrent] = useState('home')
    let dispatch = useDispatch()
    let state = useSelector(state => state)
    let history = useHistory()

    let handleClick = (e) => {
        setCurrent(e.key)
    }
    let logout = () => {
        firebase.auth().signOut()
        dispatch({
            type: 'LOGOUT',
            payload: null
        })
        history.push('/login')
    }
        return (
            <Menu onClick={handleClick}
                selectedKeys={[current]} mode="horizontal">
                <Item key="home" icon={<AppstoreOutlined />}>
                    <Link to="/">Home</Link>
                </Item>
                <Item key="shop" icon={<ShoppingOutlined />}>
                    <Link to="/shop">Shop</Link>
                </Item>
              {!state.user ? <>
                <Item key="register" icon={<UserAddOutlined />} className="float-right">
                <Link to="/login">Login</Link>
                </Item>

                <Item key="login" icon={<UserOutlined />} className="float-right">
                <Link to="/register" key="register">Register</Link>
                </Item> 
                </> :
                <SubMenu icon={<SettingOutlined />} title={state.user.email.split('@')[0]} key="s">
                       {state.user && state.user.role === 'subscriber' ? 
                       <Item key="user">
                           <Link to="/user/history">Dashboard</Link>
                       </Item> :
                        <Item key="admin">
                            <Link to="/admin/dashboard">Dashboard</Link>
                        </Item> }
                       
                        <Item key="logout" onClick={logout}
                        icon={<LogoutOutlined />}>Logout</Item>
                </SubMenu>
               }
               <span className='float-right p-1'>
                   <Search />
               </span>
            </Menu>
        )
}

export default Header