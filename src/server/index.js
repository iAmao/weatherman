import fs from 'fs'
import cors from 'cors'
import path from 'path'
import logger from 'morgan'
import express from 'express'

const app = express()

const { PORT = 3000 } = process.env

const image = fs.readFileSync(path.resolve(__dirname, '../client/index.html'), 'utf-8')

app.use(cors())

app.use(logger('dev'))

app.use(express.static(path.resolve(__dirname, '../client')))

app.post('/webhook', (req, res) => {
  const response = 'Nope! Ayam not understanding'
  res.setHeader('Content-Type', 'application/json')
  return res.json({
    speech: response,
    displayText: response
  })
})

app.get('*', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../client/index.html'))
})

app.listen(PORT, () => console.log('server started on port', PORT))
