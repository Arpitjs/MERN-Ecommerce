import express from 'express'
let router = express.Router()
import { authCheck, adminCheck } from '../middlewares/auth'
import {
    create,
    read
    // update,
    // remove,
    // list
} from '../controllers/product'

router.get('/product', read)
router.post('/product', authCheck, adminCheck, create)

module.exports = router