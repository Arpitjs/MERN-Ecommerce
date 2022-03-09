import Order from '../models/Order'

export const orders = async (req, res, next) => {
    try {
        let orders = await Order.find({})
        .sort("-createdAt")
        .populate("products.product")
        res.status(200).json(orders);
    } catch (e) {
        if(e.code === 11000) return next({ msg: 'duplicate order..'})
        next({ msg: e })
    }
}

export const orderStatus = async (req, res, next) => {
    const { orderId, orderStatus } = req.body;
    try {
        let updated = await Order.findByIdAndUpdate(orderId, { orderStatus }, {new: true})
        res.status(200).json(updated);
    } catch (e) {
        if(e.code === 11000) return next({ msg: 'duplicate order..'})
        next({ msg: e })
    }
}
