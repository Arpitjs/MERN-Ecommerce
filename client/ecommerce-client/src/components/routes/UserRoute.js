import React from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'

const UserRoute = ({ children, ...rest }) => {
    let { user } = useSelector(state => ({ ...state }))
    return user && user.token ? (<Route {...rest} />) 
    : (<LoadingToRedirect />)
}

export default UserRoute


