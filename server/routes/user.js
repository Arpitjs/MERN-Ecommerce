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
  getOrders
} from "../controllers/user";

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.put("/user/cart", authCheck, emptyUserCart);
router.post("/user/address", authCheck, saveAddress);
router.post("/user/coupon", authCheck, applyCoupon);
router.post('/user/order', authCheck, createOrder);
router.get('/user/orders', authCheck, getOrders);

module.exports = router;
