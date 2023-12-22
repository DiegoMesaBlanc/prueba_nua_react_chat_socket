import { Router } from 'express'
import { getMessages } from '../controllers/chat.controller.js'
import { authRequired } from '../middlewares/validate_token.middleware.js'

const router = Router()

router.get('/messages', authRequired, getMessages)

export default router
