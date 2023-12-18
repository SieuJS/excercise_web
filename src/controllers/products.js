const HttpError = require("../models/http-error");
const Products = require("../models/products")


const addProducts = async (req, res, next) =>{
    const {ProName, Description, Price, CatID, Quantity} = req.body;

    const breakPoint = Description.find('.');

    const TinyDes = Description.slice(0,breakPoint);
    const fullDes = Description;
    const records = {
        ProName,
        Price,
        CatID, 
        Quantity,
        TinyDes,
        FullDes : Description
    }

    try{
    Products.Create(records);
    }
    catch(err) {
        return next(new HttpError(err.message, 402));
    }
    res.redirect('/products');
}; 