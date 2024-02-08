const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nom: {
        type: String,
        required: [true, 'Tapez un nom']
    },
    prenom: {
        type: String,
        required: [true, 'Tapez un prenom']
    },
    password: {type: String, required: [true, 'Tapez un mot de passe'],
    minlength: 6,
    select: false
    },
    mail: {type: String,
        required: [true, 'Tapez un e-mail'],
        unique: true,
        match: [
          // eslint-disable-next-line no-useless-escape
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Tapez un e-mail valide'
    ]},
    telephone: {
        type: Number,
        required: [true, "Tapez un numero de telephone"],
      },
    role: {type: String,
        enum: ['employe', 'responsable'],
        default: 'employe'},
    posteTravail: {
        type: String,
        required: [true, 'Tapez un poste de travail']
    },
    grade:{
        type: String,
        required: [true, 'Tapez un grade']
    },
    privateKey: {
        type: String,
        required: true
    },
    publicKey: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User;

