const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
require('dotenv').config()

const app = express();
connectDB();
app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)

app.get('/', (req, res) =>{
    res.send("Server is Running...")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}`);
})
