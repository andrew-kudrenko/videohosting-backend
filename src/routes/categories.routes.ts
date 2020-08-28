import { Router } from 'express'
import { createConnection } from '../helpers/mongodb.helpers'
import { categorySchema } from '../models/Category'

const router = Router();

(async () => {
  const connection = await createConnection('/categories')

  if (!connection) {
    throw new Error('Connection wasn\'t created')
  }

  const Category = connection.model('Category', categorySchema)

  router.route('/categories/:title?')
    .get(async (req, res) => {
      try {
        const title = req.params['title'] || null
        const matcher = title ? { title } : {}

        res.json(await Category.find(matcher))
      } catch (e) {
        res.status(500).json(e)
      }
    })
    .post(async (req, res) => {
      try {
        const { title, _id, description, previewUri } = req.body
  
        const category = { title, _id, description, previewUri }
        console.log(category)
        const exists = (await Category.find(category)).length
  
        if (!exists) {
          await new Category(category).save()
          return res.status(201).json(null)
        }
  
        res.json(`Category with title ${title} is already exists`)  
      } catch (e) {
        console.log(e)
        res.status(500).json(e)
      }
    })
    .delete(async (req, res) => {
      try {
        const { _id } = req.body

        await Category.findByIdAndDelete(_id)

        res.json(`Category ${_id} has been deleted`)
      } catch (e) {
        res.status(500).json(e)
      }
    })
    .patch(async (req, res) => {
      try {
        const { title, _id, description, previewUri } = req.body        
        const category = { title, _id, description, previewUri }
  
        await Category.findByIdAndUpdate(_id, category)
        res.json(`Category ${_id} has been modified`)        
      } catch (e) {
        res.status(500).json(e)
      }
    })

  process.on('exit', connection.close)
})()

export default router