import { Router } from 'express'
import { createConnection } from '../helpers/mongodb.helpers'
import { labelSchema } from '../models/Label'

const router = Router();

(async () => {
  const connection = await createConnection('/labels')

  const Label = connection!.model('Label', labelSchema)

  router.route('/labels/:title?')
    .get(async (req, res) => {
      try {
        const title = req.params['title'] || null
        const matcher = title ? { title } : {}

        res.json(await Label.find(matcher))
      } catch (e) {
        res.status(500).json(e)
      }
    })
    .post(async (req, res) => {
      try {
        const { title, _id } = req.body
  
        const label = { title, _id }
        const exists = (await Label.find(label)).length
  
        if (!exists) {
          await new Label(label).save()
          return res.status(201).json(null)
        }
  
        res.json(`Label with title ${title} is already exists`)  
      } catch (e) {
        res.status(500).json(e)
      }
    })
    .delete(async (req, res) => {
      try {
        const { _id } = req.body

        await Label.findByIdAndDelete(_id)

        res.json(`Label ${_id} has been deleted`)
      } catch (e) {
        res.status(500).json(e)
      }
    })
    .patch(async (req, res) => {
      try {
        const { title, _id } = req.body        
        const label = { title, _id }
  
        await Label.findByIdAndUpdate(_id, label)
        res.json(`Label ${_id} has been modified`)        
      } catch (e) {
        res.status(500).json(e)
      }
    })

  process.on('exit', connection!.close)
})()

export default router