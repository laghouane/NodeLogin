const bCrypt = require('bcryptjs') 

module.exports.hashPassword = async (password) => {
  const salt = await bCrypt.genSalt(10)
  const hash = await bCrypt.hash(password, salt)
  return hash
}

module.exports.isPasswordMatched = async (password, hash) => {
  return await bCrypt.compare(password, hash)
}
