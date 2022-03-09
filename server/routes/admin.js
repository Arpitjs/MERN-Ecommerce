import express from 'express'
let router = express.Router()
import { authCheck, adminCheck } from '../middlewares/auth'

import {
    orders, orderStatus
} from '../controllers/admin';

router.get('/admin/orders', authCheck, adminCheck, orders)
router.put('/admin/order-status', authCheck, adminCheck, orderStatus)

module.exports = router;