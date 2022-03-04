import express from 'express'
let router = express.Router()
import { authCheck } from '../middlewares/auth' 
import {userCart, getUserCart, emptyUserCart, saveAddress } from '../controllers/user';

router.post('/user/cart', authCheck, userCart);
router.get('/user/cart', authCheck, getUserCart);
router.put('/user/cart', authCheck, emptyUserCart);
router.post('/user/address', authCheck, saveAddress);

module.exports = router