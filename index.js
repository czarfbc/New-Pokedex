const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

const newLocal = './Api.js'
const Renderpokemon = require(newLocal)

app.use( bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'));


app.get('/',(req,res)=>{

    res.render('index',{});
    Renderpokemon(3)
    
});


app.listen(5000, () => {
    console.log('server rodando!');
})