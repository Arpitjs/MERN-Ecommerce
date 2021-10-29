import express from 'express'
let router = express.Router()
import { createOrUpdateUser, currentUser } from '../controllers/auth'
import { authCheck, adminCheck } from '../middlewares/auth' 

router.post('/create-or-update-user', authCheck, createOrUpdateUser)
router.post('/current-user', authCheck, currentUser)
router.post('/admin', authCheck, adminCheck, currentUser)

module.exports = router