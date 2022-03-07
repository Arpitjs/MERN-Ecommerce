import express from 'express'
let router = express.Router()
import { authCheck } from '../middlewares/auth'

import {createPayment} from '../controllers/stripe';

router.post('/create-payment', authCheck, createPayment);

module.exports = router;