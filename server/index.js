require('dotenv').config() 
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

// DB connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database is connected!"))
.catch((err) => console.log("Database not connected: ", err))

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

app.use('/', require('./routes/authRoutes'))
app.use('/notes', require('./routes/notesRoutes'))

const PORT = 8000
app.listen(PORT, () => console.log("Server is running"))