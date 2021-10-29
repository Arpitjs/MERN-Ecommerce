import User from '../models/User'

export const createOrUpdateUser = async (req, res, next) => {
    try {
        let { name, email, picture } = req.user
        let user = await User.findOneAndUpdate({ email }, {
            name: name ? name : email.split('@')[0], picture
        }, { new: true })
        if (user) {
            res.status(200).json(user)
        } else {
            let newUser = new User({ email, 
                name: email.split('@')[0], 
                picture })
            newUser.save()
            res.status(200).json(newUser)
        }
    } catch (e) {
        next({ msg: e })
    }
}

export const currentUser = async (req, res, next) => {
    let loggedInUser = await User.findOne({ email: req.user.email })
    res.status(200).json(loggedInUser)
}