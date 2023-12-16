const express = require('express')


const HttpError = require('../models/http-error');
const {signupHandler, signinHandler} = require('../controllers/testApi')
const {requireCreateUserName, requireCreateEmail, requirePassword, requireRePassWord,requireCreateName, requireSignin} = require('../utils/validators')
const {handleErrors} = require('../utils/middlewares')
const Categories = require('../models/categories')
const router = express.Router();


router.get('/' ,async (req, res, next) => {
    if(!req.session.authenticated){
        return res.redirect('/users/signin')
    }
    const {Email,Username} = req.session.user;
    const {authenticated} = req.session;
    
    return res.redirect('/');
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

router.post('/signin', 
[requirePassword],handleErrors('signin', ['password']), signinHandler);

module.exports = router;