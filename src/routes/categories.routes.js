const express = require('express')
const HttpError = require('../models/http-error')
const Products = require('../models/products')
const Categories = require('../models/categories');
const router = express.Router();


router.get('/:cid/products',  async (req,res,next) => {
    const cid = req.params.cid;
    const products = await Products.getProductsByCat(cid);
    const categories = await Categories.getAll();
    return res.render('categories', {
        products,
        categories
    })
})

module.exports = router;