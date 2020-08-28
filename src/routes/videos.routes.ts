import { Router } from 'express'
import { createConnection } from '../helpers/mongodb.helpers'
import { videoSchema } from '../models/Video'

const router = Router();

(async () => {
  const connection = await createConnection('/videos')

  if (!connection) {
    throw new Error('Connection wasn\'t created')
  }

  const Video = connection.model('Video', videoSchema)

  router.route('/videos/:id?')
    .get(async (req, res) => {
      try {
        const id = req.params['id'] || null
        const matcher = id ? { id } : {}

        res.json(await Video.find(matcher))
      } catch (e) {
        res.status(500).json(e)
      }
    })
    .post(async (req, res) => {
      try {
        const { title, _id, description, previewUri, date, labels, categories, uri } = req.body

        const video = { title, _id, description, previewUri, date, labels, categories, uri }
        console.log(video)
        const exists = (await Video.find(video)).length

        if (!exists) {
          await new Video(video).save()
          return res.status(201).json(null)
        }

        res.json(`Video is already exists`)
      } catch (e) {
        console.log(e)
        res.status(500).json(e)
      }
    })
    .delete(async (req, res) => {
      try {
        const { _id } = req.body

        await Video.findByIdAndDelete(_id)

        res.json(`Video ${_id} has been deleted`)
      } catch (e) {
        res.status(500).json(e)
      }
    })
    .patch(async (req, res) => {
      try {
        const { title, _id, description, previewUri, date, labels, categories, uri } = req.body
        const video = { title, _id, description, previewUri, date, labels, categories, uri }

        await Video.findByIdAndUpdate(_id, video)
        res.json(`Video ${_id} has been modified`)
      } catch (e) {
        res.status(500).json(e)
      }
    })

  process.on('exit', connection.close)
})()

export default router