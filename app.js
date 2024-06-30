require('dotenv').config()
require('express-async-errors');
// express 
const express = require('express');
const app = express()
// DB
const connect = require('./db/connect');
//routes
const authRouter = require('./routes/authRoutes');

// Error Middlewares
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
// Other Middleware
const morgan = require('morgan');

// Middlewares
app.use(express.json());
app.use(morgan('tiny'));

// Routes

app.use('/api/v1/auth', authRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 5000
const start = async () => {
    try {
        await connect(process.env.MONGO_URL);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}...`)
        })
    } catch (err) {
        console.log(err)
    }
}
start()