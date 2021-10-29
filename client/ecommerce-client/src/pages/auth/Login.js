import { useState, useEffect } from 'react'
import { auth, googleAuthProvider } from '../../firebase'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import AuthForm from '../../components/Forms/AuthForm'
import { CreateOrGetUser } from '../../functions/UserInfo'

let Login = ({ history }) => {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [submitting, setSubmitting] = useState(false)

    let dispatch = useDispatch()
    let { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        if(user && user.token) history.push('/')
    }, [user, history])

    const roleBasedRedirect = response => {
        if(response.data.role === 'admin') {
            history.push('/admin/dashboard')
        } else {
            history.push('/user/history')
        }
    }

    //this actually registers a new user as well
    let googleLogin = async e => {
        e.preventDefault()
        auth.signInWithPopup(googleAuthProvider)
        .then(async result => {
            let { user } = result
            let idTokenResult = await user.getIdTokenResult()
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
       roleBasedRedirect(response)
       })
        })
       .catch(err => toast.error(err))
    }

    let handleLogin = async (e) => {
        setSubmitting(true)
        e.preventDefault()
        try {
            let result = await auth.signInWithEmailAndPassword(email, password)
            setSubmitting(false)
            let { user } = result
            let idTokenResult = await user.getIdTokenResult()
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
           roleBasedRedirect(response)
           })
           .catch(err => toast.error(err.message))
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