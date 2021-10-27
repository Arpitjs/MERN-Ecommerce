import React, { useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { SyncOutlined } from '@ant-design/icons'

let Register = () => {
let [email, setEmail] = useState("")
let [submitting, setSubmitting] = useState(false)

    let handleRegister = async (e) => {
        setSubmitting(true)
        e.preventDefault()
        let config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        }
        await auth.sendSignInLinkToEmail(email, config)
        toast.success(`Email is sent to ${email}. Click the link to complete registration.`)
        localStorage.setItem('email', email)
        setEmail('')
        setSubmitting(false)
    }
        return (
            <div className="container p-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h4>Register</h4>
                        <form>
                            <input type="email" value={email} placeholder="email"
                            onChange={e => setEmail(e.target.value)}
                            autoFocus
                            className="form-control"/>
                    { submitting ? <SyncOutlined></SyncOutlined> :
                    <button type="submit"
                            className="btn btn-raised" onClick={handleRegister}>Register</button>}
                           
                        </form>
                    </div>
                </div>
            </div>
        )
}

export default Register