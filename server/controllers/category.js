import Category from '../models/Category'
import SubCategory from '../models/SubCategory'
import slugify from 'slugify'
import Product from '../models/Product'

export const create = async (req, res, next) => {
    let { name } = req.body
    try {
        let category = await Category.create({
            name,
            slug: slugify(name)
        })
        res.status(200).json(category)
    } catch (e) {
        if(e.code === 11000) return next({ msg: 'duplicate category.'})
        next({ msg: e })
    }
}

export const list = async (req, res, next) => {
    try {
        res.json(
            await Category.find()
            .sort({ createdAt: -1 })
        )
    } catch (e) {
        next({ msg: e })
    }
}

export const read = async (req, res, next) => {
    try {
        let category = await Category
        .findOne({ slug: req.params.slug });
        if(!category) return next({ msg: 'no such category found.', status: 404 })
        const products = await Product.find({ category: category._id })
        .populate('category')
        res.json({ category, products })
    } catch (e) {
        next({ msg: e })
    }
}

export const update = async (req, res, next) => {
    let { name } = req.body
    try {
        res.json(
            await Category
            .findOneAndUpdate({ slug: req.params.slug }, {
                name, slug: slugify(name)
            },{ new: true})
        )
    } catch (e) {
        next({ msg: e })
    }
}

export const remove = async (req, res, next) => {
    try {
        res.status(204).json(
            await Category
            .findOneAndDelete({ slug: req.params.slug })
        )
    } catch (e) {
        next({ msg: e })
    }
}

export const getSubs = async(req, res, next) => {
    try {
        let sub = await SubCategory.find({ parent: req.params.id })
        res.json(sub)
    } catch (e) {
        next({ msg: e })
    }
}