const express = require('express');
const app = express()
const mysql = require('mysql2')
const cors = require('cors')
require('dotenv/config')

const teamsRouter = require('./routes/teamsRoute')
const playersRouter = require('./routes/playersRoute')
const teamPlayersRouter = require('./routes/teamPlayersRoute')
const resultsRouter = require('./routes/resultsRoute')

app.use(cors())
app.use(express.json());
app.use('/results', resultsRouter)
app.use('/teams', teamsRouter)
app.use('/players', playersRouter)
app.use('/team-players', teamPlayersRouter)
app.use((req, res) => {
    res.status(404).send("Page not found")
})

mysql.connect({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_SCHEMA,
    password: process.env.DB_PASS
}, () => console.log('server is running'));

app.listen(5000)