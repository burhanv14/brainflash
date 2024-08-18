require('dotenv').config()

const express = require('express');
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json());

// console.log(process.env) 

const db = mysql.createConnection({
    host : process.env.HOST,
    user : process.env.USER,
    password: '',
    database :'cards'
})

app.get('/',(re, res)=>{
    return res.json("The Backend is Working");
})

app.post('/create',(req,res) =>{
    const sql = "INSERT INTO flashcard(`uid`,`question`,`answer`) VALUES (?)";
    const values = [
        req.body.uid,
        req.body.question,
        req.body.answer
    ]
    db.query(sql,[values],(err, data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/update/:uid',(req,res) =>{
    const sql = "UPDATE flashcard SET question=?,answer=? WHERE uid=?";
    const values = [
        req.body.question,
        req.body.answer
    ]
    const uid = req.params.uid;
    db.query(sql,[...values, uid],(err, data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete('/delete/:uid',(req,res) =>{
    const sql = "DELETE FROM flashcard WHERE uid=?"
     const uid = req.params.uid;
    db.query(sql,[uid],(err, data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.get('/flashcard',(req,res)=>{
    const sql = "SELECT * from flashcard"
    db.query(sql, (err,data)=>{
        if(err) return res.json(err);
        else res.json(data);
    })
})



app.listen(process.env.PORT, ()=>{
    console.log("listening");
})