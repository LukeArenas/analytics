const app = require('express')
const bodyParser = require('body-parser')

const AppRouter = require('./routes')

const PORT = process.env.PORT || 3001

app.use(bodyParser.json())

app.get('/', (req, res) => res.json({ message: 'Server Works' }))
app.use('/api', AppRouter)

app.listen(PORT, () => console.log(`Server Started On Port: ${PORT}`))
