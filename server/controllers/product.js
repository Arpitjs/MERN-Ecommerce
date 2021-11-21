import Product from '../models/Product'
import slugify from 'slugify'

export const create = async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    try {
        let product = await Product.create({
            ...req.body,
        })
        console.log('CREATED PRODCUT', product)
        res.status(200).json(product)
    } catch (e) {
        if(e.code === 11000) return next({ msg: 'duplicate product.'})
        next({ msg: e })
    }
}

export const read = async (req, res, next) => {
    try {
        res.json(
            await Product.find({})
        )
    } catch (e) {
        next({ msg: e })
    }
}