const express = require('express');
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json());

const db = mysql.createConnection({
    host :"localhost",
    user :"root",
    password: '',
    database :'cards'
})

app.get('/',(re, res)=>{
    return res.json("The Backend is Working");
})

app.post('/create',(req,res) =>{
    const sql = "INSERT INTO flashcards(`uid`,`question`,`answer`) VALUES (?)";
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
    const sql = "UPDATE flashcards SET question=?,answer=? WHERE uid=?";
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
    const sql = "DELETE FROM flashcards WHERE uid=?"
     const uid = req.params.uid;
    db.query(sql,[uid],(err, data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.get('/flashcards',(req,res)=>{
    const sql = "SELECT * from flashcards"
    db.query(sql, (err,data)=>{
        if(err) return res.json(err);
        else res.json(data);
    })
})



app.listen(8081, ()=>{
    console.log("listening");
})