import { useState } from 'react'
import UserNav from '../../components/nav/UserNav'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'

const Password = () => {
    let [password, setPassword] = useState("")
    let [loading, setLoading] = useState(false)

    let handleSubmit = e => {
        e.preventDefault()
        setLoading(true)
        auth.currentUser
            .updatePassword(password)
            .then(() => {
                toast.success('your password is updated')
                setLoading(false)
                setPassword("")
            })
            .catch(err => {
                setLoading(false)
                toast.error(err.message)
            })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    {loading ? <h4>loading...</h4> : <h4>Password update</h4>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Your Password</label>
                            <input type="password" value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="form-control"
                                disabled={loading}
                            />
                            <button className="btn btn-primary"
                                disabled={!password || loading || password.length < 6}
                            >Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Password