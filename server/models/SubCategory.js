import mongoose from 'mongoose'
let { ObjectId } = mongoose.Schema

let subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required',
        minlength: [2, 'too short'],
        maxlength: [32, 'too long']
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    parent: {
        type: ObjectId,
        ref: 'Category',
        required: true
    }
},  {
    timestamps: true
})

let subCategory = mongoose.model('SubCategory', subCategorySchema)

export default subCategory