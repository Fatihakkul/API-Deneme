// IMPORT CONFIG AND DEPENDENCIES
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const multer = require('multer');
var fs = require('fs');
const socket = require('socket.io')
const sequlize = require('./database/database')



//IMPORT MODELS
const User = require('./model/user')

const app = express();

const authRoute = require('./route/auth/auth')
const userRoute = require('./route/user/user')



app.use(bodyParser.json());  // application-json


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/api/auth' , authRoute)

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});
app.use(helmet());
app.use(compression());


let userData = null;
sequlize
  .sync()
  .then((result) => {
    console.log(result);
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        email: "",
        password: "",
        name: "",
       
      })
    }
    return user;
  })
//   .then((user) => {

//     userData = user;
//     return User_Roles.findByPk(1);
//   })
//   .then((UserRole) => {
//     console.log("kjsfnv ", userData.id);
//     if (!UserRole) {
//       return User_Roles.create({
//         roleName: "Admin",
//         userId: userData.id,
//         deleted: false
//       })
//     }
//     return UserRole
//   })
  .then((User) => {
    // const dir = './images';
    // if (!fs.existsSync(dir)) {
    //   fs.mkdirSync(dir);
    // }
    console.log(User);
    const server = app.listen(process.env.PORT || 3000);
    const io = socket(server)
    require('./socket/socket')(io)
  })
  .catch(err => {
    console.log(err);
  });
