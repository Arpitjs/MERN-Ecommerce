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
                .populate('category')
                .populate('subs')
                .sort([['createdAt', 'desc']])
        )
    } catch (e) {
        next({ msg: e })
    }
}

export const readByCount = async (req, res, next) => {
    try {
        res.json(
            await Product.find({})
                .limit(parseInt(req.params.count))
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

export const list = async (req, res, next) => {
    console.table(req.query);
    try {
    const {sort, order, page } = req.query;
    const currentPage = +page || 1;
    const perPage = 3;

    const products = await Product.find({})
    .skip((currentPage - 1) * perPage)
    .populate('category').populate('subs')
    .sort([[sort, order]])
    .limit(perPage);

    res.json({ products });
    } catch (e) {
        next({ msg: e });
    }
}

export const productsCount = async (req, res, next) => {
    const total = await Product.find({})
    .estimatedDocumentCount();
    res.json(total);
}