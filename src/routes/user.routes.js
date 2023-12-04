const express = require('express')


const HttpError = require('../models/http-error');
const {signupHandler, signinHandler} = require('../controllers/testApi')
const {requireCreateUserName, requireCreateEmail, requirePassword, requireRePassWord,requireCreateName, requireSignin} = require('../utils/validators')
const {handleErrors} = require('../utils/middlewares')

const router = express.Router();


router.get('/' , (req, res, next) => {
    if(!req.session.authenticated){
        res.redirect('/signin')
    }
    const {Email,Username} = req.session.user;
    res.render('home', {
        title : "USER PAGE",
        style : "home.css",
        username : Username
    })
})

router.get(
    '/signin', (req,res,next) => {
        res.render('signin', {
            title : "SIGN IN",
            style : "auth.css",
        })
    }
)

router.get('/signup', (req,res,next) => {
    res.render('signup', {
        title : "SIGN UP",
        style : "auth.css"
    })
})


// For api testing 
router.post('/api/signup', [requireCreateUserName,                      requireCreateEmail,
    requireCreateName,
    requirePassword,
    requireRePassWord
]
,handleErrors('signup', ['email', 'username', 'name','password', 'repassword'])
,signupHandler);

router.post('/api/signin', 
[requireSignin],handleErrors('signin', ['password']), signinHandler);

module.exports = router;