import { useState } from 'react'
import { auth, googleAuthProvider } from '../../firebase'
import { toast } from 'react-toastify'
import AuthForm from '../../components/Forms/AuthForm'
import { useDispatch } from 'react-redux'

let Login = ({ history }) => {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [submitting, setSubmitting] = useState(false)

    let dispatch = useDispatch()
    //this actually registers a new user as well
    let googleLogin = async e => {
        e.preventDefault()
        auth.signInWithPopup(googleAuthProvider)
        .then(async result => {
            let { user } = result
            let idTokenResult = await user.getIdTokenResult()
            dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                    email: user.email,
                    token: idTokenResult.token
                }
            })
            history.push('/')
        })
        .catch(err => toast(err.message))
    }

    let handleLogin = async (e) => {
        setSubmitting(true)
        e.preventDefault()
        try {
            let result = await auth.signInWithEmailAndPassword(email, password)
            setSubmitting(false)
            let { user } = result
            let idTokenResult = await user.getIdTokenResult()
            dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                    email: user.email,
                    token: idTokenResult.token
                }
            })
            history.push('/')
        } catch (e) {
            setSubmitting(false)
            toast.error(e.message)
        }
    }
    return (
        <AuthForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            googleLogin={googleLogin}
            submitting={submitting}
            isLogin={true}
        />
    )
}

export default Login