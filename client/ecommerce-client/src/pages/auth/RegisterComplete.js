import React, { useState, useEffect } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { SyncOutlined } from '@ant-design/icons'

let RegisterComplete = ({ history }) => {
let [email, setEmail] = useState("")
let [password, setPassword] = useState("")
let [submitting, setSubmitting] = useState(false)

    useEffect(() => setEmail(localStorage.getItem('email')), [])

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
                let id = await user.getIdTokenResult()
                //redux store
                //redirect the user
                console.log('USER', user)
                console.log('ID', id)
                // history.push('/')
            }
        } catch (e) {
            setSubmitting(false)
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