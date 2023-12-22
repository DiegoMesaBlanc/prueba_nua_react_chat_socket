import http from 'http'
import { Server as SocketServer } from 'socket.io'
import sockets from './src/socket.js'

import app from './src/app.js'
import { connectdb } from './src/db.js'

connectdb()

const server = http.createServer(app)

server.listen(3000)
console.log('Server on port', 3000)

const io = new SocketServer(server, {
  connectionStateRecovery: {}
})
sockets(io)
