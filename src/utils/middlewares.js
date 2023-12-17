const {validationResult} = require('express-validator')
const {getError}= require('../utils/helper')

module.exports = {
    handleErrors(template, errParams,mode,dataCb) {
        return async (req, res,next) => {
            let errors = validationResult(req);
            let refactErr;
            if(!errors.isEmpty()){
                refactErr= errParams.reduce((resultObj, err)=> {
                     resultObj[`${err}`] = getError(errors,err);
                     return resultObj;
                }, {})
                if(dataCb) {
                    const data = await dataCb(req);
                    return res.json({errors,...data})
                }
                else {
                     return res.render(template,{error  :{...refactErr} , style : "auth.css", mode} )
                }
            }
            else {
                return next();
            }
        }
    },
    isLoggedIn(req,res,next) {
        req.session.authenticated ? next() : res.sendStatus(401);
    }
}