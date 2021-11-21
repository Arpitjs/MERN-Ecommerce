import express from 'express'
let router = express.Router()
import { authCheck, adminCheck } from '../middlewares/auth'
import {
    create,
    read,
    update,
    remove,
    list,
    getSubs
} from '../controllers/category'

router.get('/categories', list)
router.get('/category/:slug', read)
router.post('/category', authCheck, adminCheck, create)
router.patch('/category/:slug', authCheck, adminCheck, update)
router.delete('/category/:slug', authCheck, adminCheck, remove)
router.get('/category/subs/:id', getSubs)

module.exports = router