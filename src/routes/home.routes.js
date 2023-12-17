const express= require('express') 

const HttpError = require('../models/http-error');
const Categories = require('../models/categories')
const Products = require('../models/products')
const session = require('express-session')
const router = express.Router();

router.get('/noq', async(req,res,next) => {
    const categories =  await Categories.getAll();
    req.session.authenticated = true;
    
    const top8 = await Products.getNProducts(8);

    return res.render('home', {title : "HOME PAGE" , style : "home.css" , authenticated : req.session.authenticated , 
    user : {
        username : "Sieu"
    },
    products : top8 ,
    categories
    })
})

router.get('/', async(req,res,next) => {
    const categories =  await Categories.getAll();
    const top8 = await Products.getNProducts(8);
    return res.render('home', {title : "HOME PAGE" , style : "home.css" , authenticated : req.session.authenticated , 
    products : top8 ,
    categories
    })
})






module.exports = router;
