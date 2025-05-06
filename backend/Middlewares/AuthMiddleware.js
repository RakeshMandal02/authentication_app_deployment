const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing', success: false })
  }
  const jwtToken = authHeader.split(' ')[1]
  if (!jwtToken) {
    return res.status(401).json({ message: 'JwtToken missing', success: false })
  }
  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET)
    req.user = decoded
    console.log('Authenticated user:', decoded) // Debug log
    next()
  } catch (err) {
    console.log('JWT verification error:', err) // Debug log
    res.status(401).json({ message: 'Invalid or expired token', success: false })
  }
}

module.exports = authenticate
