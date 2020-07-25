import { Router } from 'express'
import { createConnection } from '../helpers/mongodb.helpers'
import { categorySchema } from '../models/Category'

const router = Router();

(async () => {
  const connection = await createConnection('/categories')

  const Category = connection!.model('Category', categorySchema)

  router.route('/categories/:title?')
    .get(async (req, res) => {
      const title = req.params['title']
      const matcher = title ? { title } : {}

      res.send(await Category.find(matcher))
    })
    .post(async (req, res) => {
      const { title, description, previewUri } = req.body

      const category = { title, description, previewUri }
      const exists = (await Category.find(category)).length

      if (!exists) {
        await new Category(category).save()
        return res.status(201).end()
      }
    })

  process.on('exit', connection!.close)
})()

export default router