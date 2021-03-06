import fs from 'fs'
import cors from 'cors'
import path from 'path'
import logger from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'

import weather from './weather'

const app = express()

const { PORT = 3000 } = process.env

const image = fs.readFileSync(path.resolve(__dirname, '../client/index.html'), 'utf-8')

app.use(cors())

app.use(logger('dev'))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.resolve(__dirname, '../client')))

app.post('/webhook', weather)

app.get('*', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../client/index.html'))
})

app.listen(PORT, () => console.log('server started on port', PORT))
