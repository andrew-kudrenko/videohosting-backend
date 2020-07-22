import { model, Schema, SchemaTypes } from 'mongoose'

export const videoSchema = new Schema({
  title: String,
  description: String,
  previewUri: String,
  date: Date,
  labels: [SchemaTypes.ObjectId],
  categories: [SchemaTypes.ObjectId] 
})

export default model('Video', videoSchema)