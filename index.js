const express = require('express')
const app = express()
const bookRoutes = require('./controllers/books')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')


// middleware
app.use(express.json())

// db connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

app.get('/', (req,res) => {
    res.send('Home')
})

app.use('/books', bookRoutes )
app.use(cors())


const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server listening on ${PORT}`))