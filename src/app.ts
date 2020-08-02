import express, { Application } from 'express'
import config from 'config'
import labelsRoutes from './routes/labels.routes'
import categoriesRouter from './routes/categories.routes'
import videosRouter from './routes/videos.routes'
import cors from 'cors'
import bodyParser from 'body-parser'

const port = config.get('port') || 7000
const app: Application = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS')
  res.send()
})

app.use('/', videosRouter)
app.use('/', categoriesRouter)
app.use('/', labelsRoutes)

app.listen(port, () => console.log(`Server has been started on port ${port}`))