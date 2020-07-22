import { Router } from 'express'
import { createConnection } from '../helpers/mongodb.helpers'
import { labelSchema } from '../models/Label'

const router = Router();

(async () => {
  const connection = await createConnection('/labels')

  const Label = connection!.model('Label', labelSchema)

  router.route('/labels/:title?')
    .get(async (req, res) => {
      const title = req.params['title'] || null
      const matcher = title ? { title } : {}

      res.send(await Label.find(matcher))
    })
    .post(async (req, res) => {
      const { title } = req.body

      const label = { title }
      const exists = (await Label.find(label)).length

      if (!exists) {
        await new Label(label).save()
        res.status(201).send()
      }
    })

  process.on('exit', connection!.close)
})()

export default router