import User from "../models/User";
import Cart from "../models/Cart";
const stripe = require("stripe")(process.env.STRIPE_SECRET);

export const createPayment = async (req, res, next) => {
  try {
    //find the user
    const user = await User.findOne({ email: req.user.email });
    //get user cart total
    const { cartTotal, totalAfterDiscount } = await Cart.findOne({
      orderedBy: user._id,
    });
    //create payment intent with order amt & currency
    let finalPrice = 0;
    req.body.coupon ? finalPrice = parseInt(totalAfterDiscount) * 100 : finalPrice = parseInt(cartTotal) * 100
    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalPrice,
      currency: "usd",
    });
    res.json({
      clientSecret: paymentIntent.client_secret,
      cartTotal, totalAfterDiscount, payable: finalPrice
    });
  } catch (e) {
    next({ msg: e });
  }
};
