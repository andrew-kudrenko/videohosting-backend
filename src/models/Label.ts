import { model, Schema } from 'mongoose'

export const labelSchema = new Schema({
  title: {
    type: String,
    unique: true
  }
})

export default model('Label', labelSchema)