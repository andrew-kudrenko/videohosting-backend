import { Router } from 'express'
import { createConnection } from '../helpers/mongodb.helpers'
import { videoSchema } from '../models/Video'

const router = Router();

(async () => {
  const connection = await createConnection('/videos')

  const Video = connection!.model('Video', videoSchema)

  router.route('/videos/:id?')
    .get(async (req, res) => {
      const id = req.params['id']
      const matcher = id ? { id } : {}

      res.send(await Video.find(matcher))
    })
    .post(async (req, res) => {
      const { title, description, previewUri, date, labels, categories } = req.body

      const video = { title, description, previewUri, date, labels, categories }
      const exists = (await Video.find(video)).length

      if (!exists) {
        await new Video(video).save()
        return res.status(201).end()
      }
    })

  process.on('exit', connection!.close)
})()

export default router