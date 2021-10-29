import React, { useState, useEffect } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { SyncOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import {CreateOrGetUser} from '../../functions/UserInfo'

let RegisterComplete = ({ history }) => {
let [email, setEmail] = useState("")
let [password, setPassword] = useState("")
let [submitting, setSubmitting] = useState(false)
let dispatch = useDispatch()
let { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        setEmail(localStorage.getItem('email'))
        if(user && user.token) history.push('/')
    }, [user, history])

    let handleRegisterComplete = async (e) => {
        setSubmitting(true)
        e.preventDefault()
        //validation
        if(! email || !password) {
            toast.error('Email & password are required.')
            return
        }
        if(password.length < 6) {
            toast.error('password must be atleast six characters long.')
            return
        }
        try {
            let result = await auth.signInWithEmailLink(email, window.location.href)
            setSubmitting(false)
            if(result.user.emailVerified) {
                localStorage.removeItem('email')
                let user = auth.currentUser
                await user.updatePassword(password)
                //get user id token (jwt)
                let idTokenResult = await user.getIdTokenResult()
                //redux store
                CreateOrGetUser(idTokenResult, '/create-or-update-user')
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
               .catch(err => toast.error(err))
                //redirect the user
                history.push('/')
            }
        } catch (e) {
            setSubmitting(false)
            console.log(e.message)
            toast.error(e.message)
        }
    }
    return (
        <div className="container p-5">
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h4>Register</h4>
                <form>
                    <input type="email" value={email} placeholder="email" disabled
                    onChange={e => setEmail(e.target.value)}
                    autoFocus
                    className="form-control"/>
                    <input type="password" value={password} placeholder="password"
                    className="form-control" autoFocus
                    onChange={e => setPassword(e.target.value)}
                    />
                    <br />
            { submitting ? <SyncOutlined></SyncOutlined> :
            <button type="submit"
                    className="btn btn-raised" onClick={handleRegisterComplete}>Complete Your Register Process</button>}
                   
                </form>
            </div>
        </div>
    </div>
    )
}

export default RegisterComplete