import admin from '../firebase/index'
import User from '../models/User'

export const authCheck = async (req, res, next) => {
    // console.log(req.headers)
    try {
        let firebaseUser = await admin
        .auth()
        .verifyIdToken(req.headers.authtoken)
        req.user = firebaseUser
    } catch (e) {
        next({ msg: e, status: 401 })
    }
    next()
}

export const adminCheck = async (req, res, next) => {
    try {
        let userAdmin = await User.findOne({ email: req.user.email })
        if(userAdmin.role !== 'admin') return next({ 
            msg: 'You are not authorized', status: 403})
       next()     
    } catch (e) {
        next({ msg: e, status: 400 })
    }
}