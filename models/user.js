const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username']
    },
    password: {type: String, required: [true, 'Please add a password'],
    minlength: 6,
    select: false
    },
    mail: {type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
          // eslint-disable-next-line no-useless-escape
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
    ]},
    role: {type: String,
        enum: ['admin', 'owner', 'client'],
        default: 'client'},
    joinedAt: {
        type: Date,
        default: Date.now
    },
    isActive:{type: Boolean,
        default: true}
})

const User = mongoose.model('User', userSchema)

module.exports = User;

