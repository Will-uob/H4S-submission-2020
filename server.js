require("dotenv").config();

const express = require("express");
const app = express();

const expressLayouts = require("express-ejs-layouts");

const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.qmn10.mongodb.net/H4SDB?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established");
});

app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout", "layouts/default");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json({
  limit: "10mb",
}));

const flash = require('express-flash');
const session = require('express-session');

app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))

const passport = require('passport');
const initializePassport = require('./config/passport');
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
})

const index = require('./routes/index');
const login = require('./routes/login');
const signup = require('./routes/signup');
const learn = require('./routes/learn');

app.use('/', index);
app.use('/login', login);
app.use('/signup', signup);
app.use('/learn', learn);

app.listen(5000, () => {
  console.log('Server started on port 5000');
})