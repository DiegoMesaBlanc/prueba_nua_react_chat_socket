import Message from '../models/message.model.js'

export const getMessages = async (req, res) => {
  const messages = await Message.find({})

  if (!messages) return res.status(401).json({ message: 'Messages not found' })

  return res.json(messages)
}
