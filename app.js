const express = require('express');
const usersRouter = require('./routers/users');
const reclamationRouter = require('./routers/reclamation');
const authRouter = require('./routers/auth');
const fileUpload = require('express-fileupload');

require('dotenv').config()
require('./config/db-connect')

const app = express()



app.use(express.json())

app.use(fileUpload())

// using routers

app.use('/api/v1/users', usersRouter)

app.use('/api/v1/orders', reclamationRouter)

app.use('/api/v1/auth', authRouter)



app.listen(process.env.port)