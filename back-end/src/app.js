import cookieParser from 'cookie-parser'
import expres from 'express'
import morgan from 'morgan'
import cors from 'cors'
import http from 'http'
import { Server as SocketServer } from 'socket.io'

import authRoutes from './routes/auth.routes.js'
import chatRoutes from './routes/chat.routes.js'

const app = expres()
const server = http.createServer(app)
const io = new SocketServer(server, {
  connectionStateRecovery: {}
})

io.on('connection', (socket) => {
  console.log(socket.id)

  socket.on('message', (body) => {
    console.log(body)
    socket.broadcast.emit('message', {
      body,
      from: socket.id.slice(6)
    })
  })
})

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true
  })
)
app.use(morgan('dev'))
app.use(expres.json())
app.use(cookieParser())

app.use('/api/users', authRoutes)
app.use('/api/chat', chatRoutes)

export default server
