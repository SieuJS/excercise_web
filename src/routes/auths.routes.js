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
      res.redirect('/test')
    }
  );

module.exports = router;