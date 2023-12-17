const express = require("express");
const path = require("path");
require("dotenv").config();
const { engine } = require("express-handlebars");
const session = require("express-session");
const passport = require('passport')

const Categories = require("./models/categories");
const Products = require("./models/products");
const HttpError = require("./models/http-error");
const UserRouter = require("./routes/user.routes");
const { checkConnection } = require("./database/connect");
const { stat } = require("fs");


const HomeRouter = require("./routes/home.routes");
const CatRouter = require("./routes/categories.routes");
const AuthRouter = require('./routes/auths.routes')
const {isLoggedIn} = require('./utils/middlewares')
//get port
const PORT = +process.env.SEVER_PORT;

const app = express();

// view engine set up
app.use(express.static(path.join(__dirname, "public")));
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/resources/views"));

// globle setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "admin",
    cookie: { maxAge: 30000 },
    saveUninitialized: false,
  })
);

app.use(express.static("/public"));
app.use(passport.initialize());
app.use(passport.session());

// ROUTE

app.use("/users", UserRouter);

app.use("/categories", CatRouter);

app.use('/auth',AuthRouter);

app.get("/", async (req, res, next) => {
  const categories = await Categories.getAll();
  const top8 = await Products.getNProducts(8);
  return res.render("home", {
    title: "HOME PAGE",
    style: "home.css",
    authenticated: req.session.authenticated,
    products: top8,
    categories,
    user: req.session.user,
  });
});

app.get("/test",isLoggedIn, async (req, res, next) => {
  const categories = await Categories.getAll();
  req.session.authenticated = true;

  const top8 = await Products.getNProducts(8);

  return res.render("home", {
    title: "HOME PAGE",
    style: "home.css",
    authenticated: req.session.authenticated,
    user: {
      username: "Sieu",
    },
    products: top8,
    categories,
  });
});

// Error handler

app.use((error, req, res, next) => {
  // Check that Have the res been sent ?
  if (req.headerSent) {
    return next(error);
  }
  let statusCode;
  if (error.code >= 100 && error.code < 600) {
    statusCode = error.code;
  } else statusCode = 500;
  // Check the status and set it
  res.status(statusCode);
  // Leave the message
  res.json({
    message: error.message || "There some errors occured ",
    code: statusCode,
  });
});

// Start app
app.listen(PORT, async () => {
  try {
    await checkConnection();
  } catch (err) {
    console.log(err.message);
  }
  console.log(`running server on port : ${PORT}`);
});
