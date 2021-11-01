import express from 'express'
let router = express.Router()
import { authCheck, adminCheck } from '../middlewares/auth'
import {
    create,
    read,
    update,
    remove,
    list
} from '../controllers/subCategory'

router.get('/subs', list)
router.get('/sub/:slug', read)
router.post('/sub', authCheck, adminCheck, create)
router.patch('/sub/:slug', authCheck, adminCheck, update)
router.delete('/sub/:slug', authCheck, adminCheck, remove)

module.exports = router