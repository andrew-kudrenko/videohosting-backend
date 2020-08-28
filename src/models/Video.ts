import { model, Schema } from 'mongoose'

export const videoSchema = new Schema({
  _id: String,
  title: String,
  description: String,
  previewUri: String,
  uri: String,
  date: String,
  labels: [String],
  categories: [String] 
})

export default model('Video', videoSchema)