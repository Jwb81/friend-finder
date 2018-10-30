const express = require('express')
const path = require('path')

const apiRoutes = require('./app/routing/apiRoutes')
const htmlRoutes = require('./app/routing/htmlRoutes')

const app = express();
const PORT = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, 'app', 'public')))

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use(apiRoutes)
app.use(htmlRoutes)

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})

