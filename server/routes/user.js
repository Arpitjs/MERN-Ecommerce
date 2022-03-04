import express from "express";
let router = express.Router();
import { authCheck } from "../middlewares/auth";
import {
  userCart,
  getUserCart,
  emptyUserCart,
  saveAddress,
  applyCoupon,
} from "../controllers/user";

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.put("/user/cart", authCheck, emptyUserCart);
router.post("/user/address", authCheck, saveAddress);
router.post("/user/coupon", authCheck, applyCoupon);

module.exports = router;
