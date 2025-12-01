const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

const app = express()

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Yhdistetty MongoDB:hen')
  })
  .catch((error) => {
    logger.error('Virhe MongoDB-yhteydessä:', error.message)
  })

app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app