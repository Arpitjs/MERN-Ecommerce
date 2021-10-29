import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import fs from 'fs'
let morgan = require('morgan')
require('dotenv').config({path: './config.env'})

let app = express()

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Database connected.'))
.catch(err => console.log(err))

app.use(morgan('dev'))
app.use(express.json({ limit: '200mb' }))
app.use(cors())
fs.readdirSync('./routes')
.map(route => app.use('/api', require(`./routes/${route}`)))

app.use((err, req, res, next) => {
    console.log('ERR HANDLING MIDDLEWARE')
    console.log(err)
    let errStatus = err.status || 400
    res.status(errStatus).json({
        msg: err.msg
    })
})

let port = process.env.PORT
app.listen(port, () => console.log(`server listening at ${port}`))