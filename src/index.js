const express = require('express');
const path = require('path')
require('dotenv').config();
const {engine} = require('express-handlebars')
const session = require('express-session')


const HttpError = require('./models/http-error');
const UserRouter = require('./routes/user.routes');
const {checkConnection} = require('./database/connect');
const { stat } = require('fs');

//get port
const PORT = +process.env.SEVER_PORT;


const app = express();

// view engine set up 
app.use(express.static(path.join(__dirname,'public')));
app.engine('.hbs', engine({
    extname : ".hbs"
}));
app.set('view engine' , '.hbs');
app.set('views', path.join(__dirname,'/resources/views'))

// globle setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(session ({
    secret : 'admin',
    cookie : {maxAge : 30000},
    saveUninitialized: false
}))


// ROUTE
app.get('/' , async (req,res,next) => {
    // check db connection : 
    res.render('home', {title : "HOME PAGE"})
})

app.use('/users',UserRouter);


// Error handler 

app.use((error, req, res, next) => {
    // Check that Have the res been sent ?
    if(req.headerSent) {
        return next(error);
    }
    let statusCode ;
    if(error.code >= 100 && error.code <600) {
        statusCode = error.code;
    }
    else statusCode = 500;
    // Check the status and set it 
    res.status(statusCode);
    // Leave the message 
    res.json({message : error.message || "There some errors occured " , code : statusCode});
})


// Start app
app.listen(PORT, async () => {
    try {
        await checkConnection();
    }
    catch (err) {
        console.log(err.message)    
    }
    console.log(`running server on port : ${PORT}`)
})