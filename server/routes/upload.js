import express from 'express'
import upload from '../controller/upload'

const router = express.Router()

router.post('/upload', upload.postFile)

export default router
