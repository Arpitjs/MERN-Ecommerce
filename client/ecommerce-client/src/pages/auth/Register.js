import { useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import AuthForm from '../../components/Forms/AuthForm'

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
        <AuthForm  
        email={email}
        setEmail={setEmail}
        submitting={submitting}
        handleRegister={handleRegister} />
     )
}

export default Register