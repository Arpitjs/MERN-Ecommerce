import express from 'express'
let router = express.Router()
import { authCheck, adminCheck } from '../middlewares/auth'
import {
    create,
    read,
    readOne,
    update,
    remove,
} from '../controllers/product'

router.get('/products', read)
router.post('/product', authCheck, adminCheck, create)
router.put('/product/:slug', authCheck, adminCheck, update)
router.delete('/product/:slug', authCheck, adminCheck, remove)
router.get('/product/:slug', readOne);

module.exports = router