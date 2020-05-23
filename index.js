const express = require('express')
const port = 3050
const app = express()
const useragent = require('express-useragent')


app.use(express.json())
app.use(useragent.express())
//setup DB
const configureStore = require('./config/db')
configureStore()

const routes = require('./config/routes')
app.use('/',routes)
app.listen(port,()=>{
    console.log('Listening to port',port)
})