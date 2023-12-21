import mongoose from 'mongoose'

export const connectdb = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://root:d13g0@fullstackopen-react.1mbuisy.mongodb.net/nua-app?retryWrites=true&w=majority'
    )
    console.log('>>>> DB is connected')
  } catch (error) {
    console.log(error)
  }
}
