import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      trim: true
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true
  }
)

userSchema.set('toJSON', {
  transform: (document, returnObject) => {
    // delete returnObject._id
    delete returnObject.__v
    delete returnObject.password
    // delete returnObject.createdAt
    // delete returnObject.updatedAt
  }
})

const User = mongoose.model('User', userSchema)

export default User
