import { model, Schema } from 'mongoose'

export const categorySchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  description: String,
  previewUri: String
}) 

export default model('Category', categorySchema)