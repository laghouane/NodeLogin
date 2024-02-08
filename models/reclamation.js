const mongoose = require('mongoose');

// Create schema
const reclamationSchema = mongoose.Schema({
    Titre: {
      type: String,
      required: [true, 'Tapez un Titre']
    },
    Description: {
    type: String,
    required: [true, 'Tapez une description']
    },
    dateCreation: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Tapez votre adresse mail']
    }
    

})

// Create model
const Reclamation = mongoose.model('Reclamation', reclamationSchema)

module.exports = Reclamation