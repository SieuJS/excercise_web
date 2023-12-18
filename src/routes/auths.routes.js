const express = require('express');
const passport = require("passport");
const router = express.Router();
require('../config/passport-setup')

// google auth 


router.get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  router.get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/",
    }),
    function (req,res) {
      req.session.authenticated = true;
      let user = req.user;
      req.session.user = {
        id : user.id,
        Email : user.emails[0].value,
        Username : user.displayName
      }
      res.redirect('/test')
    }
  );

module.exports = router;