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
    const email = req.body.email;
    let user = User.getOneBy;
    ({Email:email});
    if(!user) {
        return next (new HttpError('Not found user' , 404));
    }
    req.session.user  = user;
    res.redirect('/users');

}