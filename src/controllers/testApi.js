const express = require('express')

const User = require('../models/user');
const HttpError = require('../models/http-error');


exports.signupHandler = async (req, res, next) => {
    const {email:Email, username:Username,password : Password,dob: DOB,name: Name} = req.body;
    let user; 
    try {
        user = await  User.create({Email, Username,Password, DOB, Name});
    }
    catch(err) {
        return next(new HttpError("Fail to insert user", 403 ));
    }
    // if login sucess : 
    req.session.authenticated = true;
    req.session.user = user;

    res.redirect('/users');
}

exports.signinHandler = async (req,res,next) => {
    const {email , password} = req.body;
    let user;
    let error ;
    try {
    user = await User.getOneBy({Email:email});
    if(!user) {
        error = {
            email : "The email is not exists",
        }
    }
    else{
        const checkCredential = await  User.comparePassword(user.Password, password);
        if (!checkCredential){
            error  = {
                password : "Bad credentials" ,
            }
        }
    }
    }
    catch (err ){
        return next (new HttpError(err.message, 402));
    }
    
    if(error) {
       return res.render ('auth', {
        error ,
        style : "auth.css"
       });
    }
    req.session.authenticated = true;
    req.session.user  = user;
    return res.redirect('/users');

}