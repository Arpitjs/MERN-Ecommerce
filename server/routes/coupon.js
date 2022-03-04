import express from 'express'
let router = express.Router()
import { authCheck, adminCheck } from '../middlewares/auth'

import {
    create,
    remove,
    list
} from '../controllers/coupon';

router.get('/coupon', list)
router.post('/coupon', authCheck, adminCheck, create)
router.delete('/coupon/:couponId', authCheck, adminCheck, remove)

module.exports = router;