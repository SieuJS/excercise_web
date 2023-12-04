const {body } = require('express-validator');
const User = require('../models/user');



module.exports = {
    // check for sign up mode : 
    requireCreateEmail : body ('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be a valid email')
    .custom(async (Email, {req}) => {
        let found = await User.getOneBy({Email});
        if(found) {
            throw new Error ('Email in use');
        }
        return true;
    }),
    requireCreateUserName : body ('username')
    .trim()
    .isLength({min: 5, max: 40})
    .withMessage('Must be 5-40 charactors')
    .custom(async (Username) => {
        let found = await User.getOneBy({Username});
        if(found) {
            throw new Error('Username in use');
        }
        return true;
    }),
    requireCreateName : body ('name')
    .trim()
    .isLength({min : 5, max : 40})
    .withMessage('Must be 5-40 charactor'),
    requirePassword : body ('password') 
    .trim()
    .isLength({min : 6 , max : 40})
    .withMessage('Must be 6-40 characters'),
    requireRePassWord : body ('repassword')
    .trim()
    .custom((rePassword, {req}) =>{
        if(rePassword !== req.body.password){
            throw new Error("Password not match!!!");
        }
        return true;
    }),
    requireSignin : body ('password')
    .trim()
    .isLength({min: 6, max : 40})
    .withMessage('Must be from 6 to 40 characters')
    .custom(async (password, {req})=> {
        const {email : Email} = req.body;
        let found = await User.getOneBy({Email});
        if(!found) {
            throw new Error("Email not exists");
        }
        else if(!(await User.comparePassword(found.Password, password))){
            throw new Error ("Password in correct");
        }
        return true;
    })
}