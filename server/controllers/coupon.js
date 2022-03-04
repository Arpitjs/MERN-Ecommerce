import Coupon from '../models/Coupon'

export const create = async (req, res, next) => {
    let { name, expiry, discount } = req.body.coupon;
    try {
        let coupon = await Coupon.create({
            name,
            expiry,
            discount
        })
        res.status(200).json(coupon);
    } catch (e) {
        if(e.code === 11000) return next({ msg: 'duplicate coupon..'})
        next({ msg: e })
    }
}

export const list = async (req, res, next) => {
    try {
        res.json(
            await Coupon.find()
            .sort({ createdAt: -1 })
        )
    } catch (e) {
        next({ msg: e })
    }
}

export const remove = async (req, res, next) => {
    try {
        res.status(204).json(
            await Coupon
            .findOneAndDelete({ couponId: req.params.couponId })
        )
    } catch (e) {
        next({ msg: e })
    }
}

