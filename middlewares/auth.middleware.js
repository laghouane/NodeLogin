
const asyncHandler = require('express-async-handler') 

const { jwtUtils } = require('../utils') 
const UserModel = require('../models/user') 

module.exports.protect = asyncHandler(async (request, response, next) => {
  const token = request.headers?.authorization?.split(' ')[1]
  if (!token) {
    return response.status(401).json({ok:false,data:'Not authorized to access this route'}) 
      
  }

  console.log(token)

  try {
    const decoded = jwtUtils.verifyToken(token)

    request.user = await UserModel.findById(decoded.id)
    return next()
  } catch (error) {
    return response.status(401).json({ok:false,data:'Not authorized to access this route', error}) 
  }
})

module.exports.hasRole = (...roles) => {
  return (request, _, next) => {
    if (!roles.includes(request.user.role)) {
        return response.status(403).json({ok:false,data:'Not authorized to access this route'}) 
    }
    next()
  }
}
