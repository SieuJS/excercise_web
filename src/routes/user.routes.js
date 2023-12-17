const express = require('express')


const HttpError = require('../models/http-error');
const {signupHandler, signinHandler} = require('../controllers/testApi')
const {requireCreateUserName, requireCreateEmail, requirePassword, requireRePassWord,requireCreateName, requireSignin} = require('../utils/validators')
const {handleErrors} = require('../utils/middlewares')
const Categories = require('../models/categories')
const router = express.Router();


router.get('/' ,async (req, res, next) => {
    if(!req.session.authenticated){
        return res.redirect('/users/auth')
    }
    const {Email,Username} = req.session.user;
    const {authenticated} = req.session;
    
    return res.redirect('/');
})

router.get(
    '/auth', (req,res,next) => {
        res.render('auth', {
            title : "SIGN IN",
            style : "auth.css",
        })
    }
)


router.get('/signout' , (req,res, next) => {
    req.session.authenticated = false;
    req.session.user = undefined;
    return res.redirect("/");

})


// For api testing 
router.post('/signup', [requireCreateUserName,                      requireCreateEmail,
    requireCreateName,
    requirePassword,
    requireRePassWord
]
,handleErrors('auth', ['email', 'username', 'name','password', 'repassword'], "signup")
,signupHandler);

router.post('/signin', 
[requirePassword],handleErrors('auth', ['password'], "signin"), signinHandler);

module.exports = router;