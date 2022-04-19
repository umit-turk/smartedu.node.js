const express = require("express");
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();

//Connect db
mongoose.connect('mongodb://localhost/smartedu-db').then(() => {
  console.log('DB connected succesfully');
})

//Templete Engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));
/* req.body den gelen verileri yakalamak için alttaki iki middlewareyi kullanmalıyız. */
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-

//Routes
app.use("/", pageRoute);
app.use('/courses',courseRoute);
app.use('/categories',categoryRoute);
app.use('/users',userRoute);


const port = 3000;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
