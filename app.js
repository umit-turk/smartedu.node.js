const express = require("express");
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();

//Connect db
mongoose.connect('mongodb+srv://dbUser:VQ0hjRhY1W01SP4Z@cluster0.qbzh9.mongodb.net/smartedu-db?retryWrites=true&w=majority').then(() => {
  console.log('DB connected succesfully');
})

//Templete Engine
app.set("view engine", "ejs");

//Global Variable

global.userIN = null;

//Middlewares
app.use(express.static("public"));
/* req.body den gelen verileri yakalamak için alttaki iki middlewareyi kullanmalıyız. */
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-
app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' })
}))
app.use(flash());
app.use((req, res, next) => {
  //flashMessages i ilgili olan templete de kullanabileceğiz.
  res.locals.flashMessages = req.flash();
  next();
})
app.use(methodOverride('_method', {
  methods:["POST", "GET"],
}))


//Routes
app.use('*',(req,res, next) => {
  userIN = req.session.userID;
  next();
 })
app.use("/", pageRoute);
app.use('/courses',courseRoute);
app.use('/categories',categoryRoute);
app.use('/users',userRoute);


const port = process.env.PORT ||  5000;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
