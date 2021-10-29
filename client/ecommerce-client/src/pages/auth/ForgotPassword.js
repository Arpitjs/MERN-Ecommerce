import { useState, useEffect } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import AuthForm from '../../components/Forms/AuthForm'
import { useSelector } from 'react-redux'

const ForgotPassword = ({ history }) => {
    let [email, setEmail] = useState("")
    let [submitting, setSubmitting] = useState(false)
    let { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        if(user && user.token) history.push('/')
    }, [user, history])
    
    let handleForgotPassword = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        let config = {
            url: process.env.REACT_APP_FORGOT_PSWD_REDIRECT_URL,
            handleCodeInApp: true
        }
        try {
        await auth.sendPasswordResetEmail(email, config)
        setEmail('')
        setSubmitting(false)
        toast.success('Check your email for password reset link.')
        } catch (e) {   
            toast(e.message)
            setSubmitting(false)
        }
    }
    return (
     <AuthForm 
     email={email}
     setEmail={setEmail}
     submitting={submitting}
     handleForgotPassword={handleForgotPassword}
     forgotPass={true}
     />
    )
}

export default ForgotPassword
