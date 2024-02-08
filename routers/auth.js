const { Router }  = require('express') 

const asyncHandler = require('express-async-handler') 

const  User  = require('../models/user') 
const { hashUtils, jwtUtils } = require('../utils') 
const crypto = require('crypto');

const authRouter = Router()

function generateKeyPair() {
  return crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048, // Longueur de la clé en bits
      publicKeyEncoding: {
          type: 'spki', // Format de l'encodage de la clé publique
          format: 'pem' // Format du fichier (pem est couramment utilisé)
      },
      privateKeyEncoding: {
          type: 'pkcs8', // Format de l'encodage de la clé privée
          format: 'pem' // Format du fichier (pem est couramment utilisé)
      }
  });
}

authRouter.post('/signup', asyncHandler(async (request, response) => {

    const { publicKey, privateKey } = generateKeyPair();

    const newUser = new User({
      nom: request.body.nom,
      prenom: request.body.prenom,
      mail: request.body.prenom,
      telephone: request.body.telephone,
      posteTravail: request.body.posteTravail,
      grade: request.body.grade,
      password: await hashUtils.hashPassword(request.body.password),
      // Stockage de la clé publique et privée dans la base de données
      publicKey: publicKey,
      privateKey: privateKey,
      // Autres données de l'utilisateur
  });

   await newUser.save();

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