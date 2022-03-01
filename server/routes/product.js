import express from 'express'
let router = express.Router()
import { authCheck, adminCheck } from '../middlewares/auth'
import {
    create,
    read,
    readOne,
    update,
    remove,
    readByCount,
    list,
    productsCount,
    starProduct,
    listRelated,
    searchFilters
} from '../controllers/product'

router.get('/products', read)
router.get('/products/:count', readByCount);
router.post('/product', authCheck, adminCheck, create)
router.put('/product/:slug', authCheck, adminCheck, update)
router.delete('/product/:slug', authCheck, adminCheck, remove)
router.get('/product/:slug', readOne);
router.get('/list', list);
router.get('/total', productsCount);
router.put('/product/star/:id', authCheck, starProduct);
router.get('/product/related/:id', listRelated);

router.post('/search/filters', searchFilters);
module.exports = router;