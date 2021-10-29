import { SyncOutlined, MailOutlined, GoogleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

const AuthForm = ({ email, setEmail, handleRegister, password, forgotPass, isRegister,
    setPassword, handleLogin, isLogin, submitting, googleLogin, handleForgotPassword
}) => {
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                  <h4>{isLogin ? 'Login' : forgotPass ? 'Forgot Password': 'Register'}</h4>
                    <form>
                        <input type="email" value={email} placeholder="email"
                            onChange={e => setEmail(e.target.value)}
                            autoFocus
                            className="form-control" />
                        <br />
                        {!isRegister && <input type="password" value={password} placeholder="password"
                            onChange={e => setPassword(e.target.value)}
                            autoFocus
                            className="form-control" />}
                        <br />
                        {submitting ? <SyncOutlined /> :
                            <Button
                                type="primary" block shape='round'
                                icon={<MailOutlined />} size="large"
                                disabled={!email}
                                className="mb-3"
                                 onClick={isLogin ? handleLogin : forgotPass ? handleForgotPassword: handleRegister }>
                                    { isLogin ? 'Login' : forgotPass ? 'Forgot Password': 'Register' }
                            </Button>}
                          {isLogin && <><Button
                                type="danger" block shape='round'
                                icon={<GoogleOutlined />} size="large"
                                className="mb-3" onClick={googleLogin}>
                                   Login with Google
                            </Button>
                            <Link to="/forgot-password" 
                            className="float-right text-danger">forgot password?</Link>
                            </>
                            }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AuthForm
