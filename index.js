var express = require('express');

const metrics = require('./metrics')

var app = express();

var path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

app.set('views', __dirname + "/views")
app.set('view engine', 'ejs');


app.get('/hello/:name/', function(req, res) {
    res.render('hello.ejs', {name: req.params.name});
});

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Welcome to the Home page \n\n 1- http://localhost:8080/ : Home Page  \n 2- http://localhost:8080/hello/[Your Name] : Hello + Your name will be display with a Button which display data \n 3- http://localhost:8080/metrics.json : Somme data will be display ' );
});


app.get('/metrics.json', (req, res) => {
    
    metrics.get((err, data) => {
      if(err) throw err
      res.status(200).json(data)
    })
})

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(8080);