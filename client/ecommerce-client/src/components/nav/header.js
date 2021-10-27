import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Menu } from 'antd'
import {
    AppstoreOutlined, 
    SettingOutlined,
    UserOutlined,
    UserAddOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom'
let { SubMenu, Item } = Menu

let Header = () => {
    let [current, setCurrent] = useState('home')
    let handleClick = (e) => {
        setCurrent(e.key)
    }
        return (
            <Menu onClick={handleClick}
                selectedKeys={[current]} mode="horizontal">
                <Item key="home" icon={<AppstoreOutlined />}>
                    <Link to="/">Home</Link>
                </Item>

                <Item key="register" icon={<UserAddOutlined />} className="float-right">
                <Link to="/login">Login</Link>
                </Item>

                <Item key="login" icon={<UserOutlined />} className="float-right">
                <Link to="/register">Register</Link>
                </Item>
               
                <SubMenu icon={<SettingOutlined />} title="Username" key="s">
                        <Item key="setting:1">Option 1</Item>
                        <Item key="setting:2">Option 2</Item>
                </SubMenu>
            </Menu>
        )
}

export default Header