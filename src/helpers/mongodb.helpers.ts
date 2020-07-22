import mongoose from 'mongoose'
import config from 'config'

const uri = config.get('mongouri') as string

const connectionOptions = {
  useFindAndModify: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}

export async function connect(endPoint: string) {
  try {
    await mongoose.connect(uri.concat(endPoint), connectionOptions)
  } catch (e) {
    console.log('Connecting error', e)
  }
}

export async function createConnection(endPoint: string) {
  try {
    return await mongoose.createConnection(uri.concat(endPoint), connectionOptions)
  } catch (e) {
    console.log('Connecting error', e)
  }
}

export async function disconnect() {
  try {
    await mongoose.disconnect()
  } catch (e) {
    console.log('Disconnecting error', e)
  }
}