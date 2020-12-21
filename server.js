const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3002;
const { v4 : uuidv4 }= require('uuid');

let notes = require('./db/db.json');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/index.html"))
})

app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,"/notes.html"))
})

app.get('/api/notes', (req, res)=>{
    res.json(notes);
    console.log(notes);
})

app.post('/api/notes', (req,res)=>{
    let results = req.body;
    let id=uuidv4();
    results.id=id;
    notes.push(results);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    console.log(results);
    res.json(notes);
});
app.listen(PORT, ()=>{    
    console.log(`API server now on port 3001`);
});