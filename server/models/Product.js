import mongoose from 'mongoose'
let { ObjectId } = mongoose.Schema

let productSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: 'title is required',
        maxlength: [32, 'too long'],
        text: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000,
        text: true
    },
    price: {
        type: Number,
        trim: true,
        required: 'price is required'
    },
    category: {
        type: ObjectId,
        ref: 'Category'
    },
    subs: [
        {
            type: ObjectId,
            ref: 'SubCategory'
        }
    ],
    quantity: Number,
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: Array
    },
    shipping: {
        type: String,
        enum: ['Yes', 'No']
    },
    color: {
        type: String,
        enum: ['Black', 'Brown', 
        'Silver', 'White', 'Blue']
    },
    brand: {
        type: String,
        enum: ['Apple', 'Samsung', 
        'Microsoft', 'Lenovo', 'ASUS']
    },
    ratings: [
        {
            star: Number,
            postedBy: { type: ObjectId, ref: 'User' }
        }
    ]
},  {
    timestamps: true
})

let Product = mongoose.model('Product', productSchema)

export default Product