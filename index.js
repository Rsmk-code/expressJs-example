const express = require('express');
const bodyParser = require("body-parser");
const memes = require('./views/test');
const app = express();
const port = 3000;
const host = '127.0.0.1' ;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", "views");

app.listen(port , host,  ()=> {
    console.log(`server runing at http://${host}:${port}`);
})
app.get('/', (req, res)=>{
   // res.send(memes);
    res.json({message: 'api is working'});
})
app.get('/memes', (req, res)=>{
    res.json(memes);
})
app.post('/memes/add', (req, res)=>{
    if(!req.body.name){
        res.status(400).send('name is required');
        }
    const meme = {
        id: memes.length+1,
        name: req.body.name,
        imgURL: req.body.imgURL,
        price: req.body.price
    }
    memes.push(meme);
    res.json({message: 'meme added'});
})
app.put('/memes/:id' , (req, res)=>{
    const id = req.params.id;
    let name = req.body.name;
    let imgURL = req.body.imgURL;
    let price = req.body.price;

    let index = memes.findIndex((meme)=> {
        return meme.id == Number.parseInt(id);
    })
    
    if(index>=0){
        let m = memes[index];
        m.name = name;
        m.imgURL = imgURL;
        m.price = price;
        res.json({message: 'meme updated'});
        res.json(m);
    }else{
        res.status(400).send('meme not found');
    }
})
app.delete('/memes/:id' , (req, res)=>{
    let id = req.params.id;
    let index = memes.findIndex((meme)=> {
        return meme.id == Number.parseInt(id);
        })
        if(index>=0){
            let m = memes[index];
            memes.splice(index, 1);
            res.json({message: 'meme deleted'});
            res.json(m);
            }else{
                res.status(400).send('meme not found');
                res.end();
            }
})
module.exports = app;