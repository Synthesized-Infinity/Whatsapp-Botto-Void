import express from 'express'

const app = express()
app.use(express.json())

app.get('/', () => '')

app.listen(process.env.PORT || 4001)
