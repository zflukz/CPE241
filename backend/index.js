const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise')
const bcrypt = require('bcrypt')
const cors = require('cors')
const app = express()
const port = 8000

let db = null

const initMySQL = async ()=>{
        db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password : '123456789',
        database: 'chickenAirlines',
        port:3306
    })
}

app.use(bodyParser.json())
app.use(cors())




app.get('/users', async (req,res) =>{
    const results = await db.query('SELECT * FROM Users')
    res.json(results[0])
})


















  



















app.listen(port , async (req , res) => {
    await initMySQL()
    console.log('http server run at ' + port)
})