const express = require('express')
const bodyParser = require('body-parser')

const Router = require('./routes/adsRouter')
const app = express()

const PORT = process.env.PORT || 3001

app.use(bodyParser.json())

app.get('/', (req, res) => res.json({ message: 'Server Works' }))
app.use('/api', Router)

app.listen(PORT, () => console.log(`Server Started On Port: ${PORT}`))
