import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema;

let userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    role: {
        type: String,
        default: 'subscriber'
    },
    cart: {
        type: Array,
        default: []
    },
    address: String,
    wishlist: [
        {
            type: ObjectId, ref: 'Product'
        }
    ]
}, {
    timestamps: true
})

let User = mongoose.model('User', userSchema)
export default User