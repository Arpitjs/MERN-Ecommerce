import express from "express";
let router = express.Router();
import { authCheck } from "../middlewares/auth";
import {
  userCart,
  getUserCart,
  emptyUserCart,
  saveAddress,
  applyCoupon,
  createOrder,
  createCashOrder,
  getOrders,
  addToWishlist,
  getWishlist,
  removeFromWishlist

} from "../controllers/user";

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.put("/user/cart", authCheck, emptyUserCart);

router.post("/user/address", authCheck, saveAddress);
router.post("/user/coupon", authCheck, applyCoupon);

router.post('/user/order', authCheck, createOrder);
router.post('/user/cash-order', authCheck, createCashOrder);
router.get('/user/orders', authCheck, getOrders);

router.post('/user/wishlist', authCheck, addToWishlist);
router.get('/user/wishlist', authCheck, getWishlist);
router.put('/user/wishlist/:productId', authCheck, removeFromWishlist);

module.exports = router;
