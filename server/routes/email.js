import express from 'express'
import email from '../controller/email'

const router = express.Router()

router.post('/reset', email.getEmail)
router.get('/reset/token', email.getEmailToken)

export default router