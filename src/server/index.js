import fs from 'fs'
import path from 'path'
import logger from 'morgan'
import express from 'express'

const app = express()

const { PORT = 3000 } = process.env

const image = fs.readFileSync(path.resolve(__dirname, '../client/index.html'), 'utf-8')

app.use(logger('dev'))

app.use(express.static(path.resolve(__dirname, '../client')))

app.get('/webhook', (req, res) => res.send('GET webhook'))

app.put('/webhook', (req, res) => res.send('PUT webhook'))

app.post('/webhook', (req, res) => res.send('POST webhook'))

app.delete('/webhook', (req, res) => res.send('DELETE webhook'))

app.get('*', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../client/index.html'))
})

app.listen(PORT, () => console.log('server started on port', PORT))
