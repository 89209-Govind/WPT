const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const config = require('./config')
const utils = require('./utils')

const userRouter = require('./routes/user')
// const adminRouter = require('./routes/admin')
const categoryRouter = require('./category')
// const imageRouter = require('./routes/image')
const propertyRouter = require('./property')
const bookingRouter = require('./booking')

const app = express()
app.use(cors())
app.use(express.json())
app.use((request, response, next) => {
    if (
        request.url === '/user/register' ||
        request.url === '/admin/login' ||
        request.url === '/admin/register' ||
        request.url === '/user/login' ||
        request.url.startsWith('/image/')
    ) {
        next()
    }
    else {
        const token = request.headers['token']
        if (!token || token.length === 0) {
            console.log('token = ' + token);

            response.send(utils.createErrorResult('Missing Token...'))
        } else {
            try {
                const payload = jwt.verify(token, config.secret)
                request.userId = payload['id']
                next()
            } catch (ex) {
                response.send(utils.createErrorResult('Invalid Token'))
            }
        }
    }
})




app.use('/user', userRouter)
// app.use('/admin', adminRouter)
app.use('/category', categoryRouter)
// app.use('/image', imageRouter)
app.use('/property', propertyRouter)
app.use('/booking', bookingRouter)

app.listen(4000, 'localhost', () => {
    console.log('Server Started...');
})

