import Product from '../models/Product'
import slugify from 'slugify'

export const create = async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    try {
        let product = await Product.create({
            ...req.body,
        })
        res.status(200).json(product)
    } catch (e) {
        if (e.code === 11000) return next({ msg: 'duplicate product.' })
        next({ msg: e })
    }
}

export const read = async (req, res, next) => {
    try {
        res.json(
            await Product.find({})
                .limit(10)
                .populate('category')
                .populate('subs')
                .sort([['createdAt', 'desc']])
        )
    } catch (e) {
        next({ msg: e })
    }
}

export const readOne = async (req, res, next) => {
    try {
        res.json(
            await Product.findOne({slug: req.params.slug})
                .populate('category')
                .populate('subs')
        )
    } catch (e) {
        next({ msg: e })
    }
}


export const update = async (req, res, next) => {
    try {
       const updated =  await Product.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true })
        res.status(204).json({ updated })
    } catch (e) {
        next({ msg: e })
    }
}


export const remove = async (req, res, next) => {
    try {
        await Product.findOneAndRemove({ slug: req.params.slug })
        res.status(204).json({ msg: 'deleted.' })
    } catch (e) {
        next({ msg: e })
    }
}
