import Message from './models/message.model.js'

export default (io) => {
  io.on('connection', (socket) => {
    // socket.on('message', async (body) => {
    //   const emitMsg = async () => {
    //     const msg = await Message.find({ mssg: body }).sort({ _id: -1 })
    //     io.emit('message', msg)
    //   }
    //   emitMsg()
    // })

    socket.on('message', (body) => {
      socket.broadcast.emit('message', {
        mssg: body,
        sesion: socket.id.slice(6)
      })
    })

    socket.on('message', async (body) => {
      const newMessage = new Message({
        mssg: body,
        sesion: socket.handshake.auth.user
      })

      await newMessage.save()
    })

    if (!socket.recovered) {
      const emitMsg = async () => {
        const msg = await Message.find({
          sesion: socket.handshake.auth.user || 0
        })

        msg.forEach((ms) => {
          socket.emit('message', ms)
        })
      }
      emitMsg()
    }
  })

  // io.on('connection', (socket) => {
  //   socket.on('message', (body) => {
  //     socket.broadcast.emit('message', {
  //       body,
  //       from: socket.id.slice(6)
  //     })
  //   })
  // })
}
