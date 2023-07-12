const express = require('express');
const itemsRouter = require('./routers/items');
const usersRouter = require('./routers/users');
const orderRouter = require('./routers/order');
const authRouter = require('./routers/auth');
const fileUpload = require('express-fileupload');

require('dotenv').config()
require('./config/db-connect')

const app = express()



app.use(express.json())

app.use(fileUpload())

// using routers
app.use('/api/v1/items', itemsRouter)

app.use('/api/v1/users', usersRouter)

app.use('/api/v1/orders', orderRouter)

app.use('/api/v1/auth', authRouter)



app.listen(process.env.port)