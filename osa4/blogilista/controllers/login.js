const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

const SECRET = process.env.SECRET || 'salainen'

loginRouter.post('/', async (request, response, next) => {
  try {
    const { username, password } = request.body

    // tarkistetaan että molemmat on annettu
    if (!username || !password) {
      return response.status(400).json({
        error: 'username ja password vaaditaan kirjautumiseen',
      })
    }

    const user = await User.findOne({ username })

    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'väärä käyttäjänimi tai salasana',
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(userForToken, SECRET, { expiresIn: 60 * 60 })

    response.status(200).json({
      token,
      username: user.username,
      name: user.name,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = loginRouter