import express from 'express'
let router = express.Router()
import { authCheck, adminCheck } from '../middlewares/auth'
import { upload, remove } from '../controllers/cloudinary'

router.post('/upload-images', authCheck, adminCheck, upload)
router.post('/remove-image', authCheck, adminCheck, remove)

module.exports = router