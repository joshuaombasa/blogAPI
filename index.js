const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')


const app = express()

const logger = require('./utils/logger')
const config = require('./utils/config')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
        .then(() => logger.info('Connected to MongoDB'))
        .catch(error => logger.error(error))

const middleware = require('./utils/middleware')

const blogRouter = require('./controllers/blog')

app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)
app.use(middleware.unknownRoutes)
app.use(middleware.errorHandler)

app.listen(config.PORT, () => {
    logger.info(`server running on port ${config.PORT}`)
})