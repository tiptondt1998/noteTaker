const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3002;
const { v4 : uuidv4 }= require('uuid');

const { notes } = require('./db/db.json');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));
// app.use('/api')



app.get('/api/notes', (req, res)=>{
    res.json(notes);
});



app.post('/api/notes', (req,res)=>{
    let results = req.body;
    let id=uuidv4();
    results.id=id;
    notes.push(results);
    fs.writeFile('./db/db.json', JSON.stringify(results));
    console.log(results);
    res.json(notes);
});

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/index.html"))
});

app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/notes.html"))
});

app.listen(PORT, ()=>{    
    console.log(`API server now on port 3001`);
});