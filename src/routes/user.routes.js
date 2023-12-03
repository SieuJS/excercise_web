const express = require('express')

const router = express.Router();

router.get('/' , (req, res, next) => {
    res.render('home', {title : "USER PAGE"})
})

router.get(
    '/login', (req,res,next) => {
        res.render('auth', {title : "LOGIN"})
    }
)

module.exports = router;