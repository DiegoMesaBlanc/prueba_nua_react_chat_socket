import cookieParser from 'cookie-parser'
import expres from 'express'
import morgan from 'morgan'

import authRoutes from './routes/auth.routes.js'
import chatRoutes from './routes/chat.routes.js'

const app = expres()

app.use(morgan('dev'))
app.use(expres.json())
app.use(cookieParser())

app.use('/api/users', authRoutes)
app.use('/api/chat', chatRoutes)

export default app
