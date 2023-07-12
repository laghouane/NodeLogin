const { Router }  = require('express') 

const asyncHandler = require('express-async-handler') 

const  User  = require('../models/user') 
const { hashUtils, jwtUtils } = require('../utils') 


const authRouter = Router()

authRouter.post('/signup', asyncHandler(async (request, response) => {
    
    const user = await User.create({
      ...request.body,
      password: await hashUtils.hashPassword(request.body.password)
    })
  
    response.status(201).json({
      status: 'success',
      data: { user, token: jwtUtils.generateToken(user._id) }
    })
  })).post('/login', asyncHandler(async (request, response) => {
    const { mail, password } = request.body
    if (!mail || !password) {
      return response.status(404).json({ok:false,message:'Please provide an email and password'}) 
    }
  
    const user = await User.findOne({ mail }).select('+password')
    if (!user) {
      return response.status(400).json({ok:false,message:'Invalid credentials'})
    }
    const isMatched = await hashUtils.isPasswordMatched(password, user.password)
    if (!isMatched) {
        return response.status(400).json({ok:false,message:'Invalid credentials'})
    }
  
    response.status(200).json({
      status: 'success',
      data: { token: jwtUtils.generateToken(user._id) }
    })
  }))

  module.exports = authRouter ;