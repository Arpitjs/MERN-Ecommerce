import SubCategory from '../models/SubCategory'
import slugify from 'slugify'

export const create = async (req, res, next) => {
    let { name, parent } = req.body
    try {
        let subCategory = await SubCategory.create({
            name,
            parent,
            slug: slugify(name)
        })
        res.status(200).json(subCategory)
    } catch (e) {
        if(e.code === 11000) return next({ msg: 'duplicate sub Category.'})
        next({ msg: e })
    }
}

export const list = async (req, res, next) => {
    try {
        res.json(
            await SubCategory.find()
            .sort({ createdAt: -1 })
        )
    } catch (e) {
        next({ msg: e })
    }
}

export const read = async (req, res, next) => {
    try {
        let subCategory = await SubCategory
        .findOne({ slug: req.params.slug })
        if(!subCategory) return next({ msg: 'no such sub category found.', status: 404 })
        res.json(subCategory)
    } catch (e) {
        next({ msg: e })
    }
}

export const update = async (req, res, next) => {
    let { name } = req.body
    try {
        res.json(
            await SubCategory
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
            await SubCategory
            .findOneAndDelete({ slug: req.params.slug })
        )
    } catch (e) {
        next({ msg: e })
    }
}

