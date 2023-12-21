import { Router } from 'express'
import { typing } from '../controllers/chat.controller.js'
import { authRequired } from '../middlewares/validate_token.middleware.js'

const router = Router()

router.get('/typing', authRequired, typing)

export default router
