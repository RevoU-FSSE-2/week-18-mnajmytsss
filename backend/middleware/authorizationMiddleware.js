const jwt = require('jsonwebtoken')
const { JWT_SIGN } = require('../config/index')

const authorizationMiddlewareAll = (req, res, next) => {
  const authHeader = req.headers.authorization
  
  if (!authHeader) {
    res.status(401).json({ error: 'Unauthorized' })
  } else {
    const token = authHeader.split(' ')[1]
    
    try {
      const decodedToken = jwt.verify(token, JWT_SIGN)
      if (decodedToken.role === 'admin' || decodedToken.role === "user") {
        next()
      } else {
        res.status(401).json({ error: 'Unauthorized' })
      }
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}

module.exports = {
    authorizationMiddlewareAll
}