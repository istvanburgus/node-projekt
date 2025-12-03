const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info(request.method, request.path)
  if (Object.keys(request.body).length > 0) {
    logger.info('Body:', request.body)
  }
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'tuntematon reitti' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'virheellinen id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'virheellinen token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token on vanhentunut' })
  }

  next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler,
}