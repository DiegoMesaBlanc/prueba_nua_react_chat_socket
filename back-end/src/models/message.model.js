import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  mssg: String,
  sesion: String
})

messageSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  }
})

const Message = mongoose.model('Message', messageSchema)

export default Message
