const jwt = require ('jsonwebtoken') 

module.exports.generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })

module.exports.verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET)