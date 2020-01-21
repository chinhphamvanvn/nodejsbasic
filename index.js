require('dotenv').config();
console.log(process.env.SESSION_SECRET);

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRoute = require('./routes/user.route');
var productRoute = require('./routes/product.route');
var authRoute = require('./routes/auth.route');

var authMiddleware = require('./middlewares/auth.middleware');

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(process.env.SESSION_SECRET));

app.get('/', function(req, res){
    res.render('index', {
        name: 'Pham Chinh'
    });
})

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/products', authMiddleware.requireAuth, productRoute);
app.use('/auth', authRoute);

app.listen(port, function() {
    console.log("server listening on port " + port);
})