const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({})
    response.json(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body

    if (!username || !password) {
      return response.status(400).json({
        error: 'username ja password vaaditaan',
      })
    }

    if (username.length < 3) {
      return response.status(400).json({
        error: 'username:n pituuden tulee olla vähintään 3 merkkiä',
      })
    }

    if (password.length < 3) {
      return response.status(400).json({
        error: 'passwordin pituuden tulee olla vähintään 3 merkkiä',
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter