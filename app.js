require('dotenv').config()
require('express-async-errors');
// express 
const express = require('express');
const app = express()
// DB
const connect = require('./db/connect');
//routes
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const User = require('./models/User');
// Error Middlewares
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
// Other Middleware
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// Middlewares
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET))
app.use(morgan('tiny'));

// Routes
app.delete('/api/v1/delete', async (req, res) => {
    await User.deleteMany({})
    res.send('Deleted')
})
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/reviews', reviewRouter)

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