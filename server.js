const express = require('express');
const cors = require('cors');
var mongoose = require('mongoose');
var url = "mongodb://localhost/meetroom";
mongoose.connect(url)
    .then((result)=>console.log(`Connected to db`))
    .catch((err)=>console.log(err));
const bodyParser = require('body-parser');
const loginRoute = require('./Auth/login');
var app = express();
const {ROOM}  = require(process.cwd() + '/models/ROOM');
var router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use('/auth', loginRoute)
var key = "!Ng4ckpfpF*M82eqzH#98?uK55&qav5^"
function verifyJWT(token)
{
  return new Promise((resolve, reject) =>
  {
    jwt.verify(token, key, (err, decodedToken) =>
    {
      if (err || !decodedToken)
      {
        return reject(err)
      }

      resolve(decodedToken)
    })
  })
}

router.use(function (req, res, next) {
    jwt.verifyJWT(req.header('x-auth-token'))
      .then((decodedToken) =>
      {
        var dateNow = new Date();
          res.locals.userid = decodedToken.data;
          next()

      })
      .catch((err) =>
      {
        res.status(400)
          .json({message: "Invalid auth token provided."})
      })

  })
  //hello
  app.get('/room',(req, res) => {
    ROOM.find({}, {'__v' : 0}, (err, data) => {
      if(err){
        res.sendStatus(500)
      }
      else {
        res.send(data)
      }
    })
  })
  app.post('/room', (req, res) => {
    var timeDate = req.body.date
    var userid = res.locals.userid

    res.send(200)
  })
  app.get("/test", (req, res) => {
    var room1 = ROOM({
      "name" : "Room 212",
      "location" : "Comp",
      "path" : "images/room1.jpg"
    })
    room1.save()
    var room2  = ROOM({
      "name" : "Room 311",
      "location" : "Comp",
      "path" : "images/room2.jpg"
    })
    room2.save()
    var room3 = ROOM({
      "name" : "Room 310",
      "location" : "Comp",
      "path" : "images/room3.jpg"
    })
    room3.save()
    var room4 = ROOM({
      "name" : "Room 212",
      "location" : "IT",
      "path" : "images/room4.jpg"
    })
    room4.save()
    var room5 = ROOM({
      "name" : "Room 311",
      "location" : "IT",
      "path" : "images/room5.jpg"
    })
    room5.save()
    var room6 = ROOM({
      "name" : "Room 310",
      "location" : "IT",
      "path" : "images/room6.jpg"
    })
    room6.save()
    var room7 = ROOM({
      "name" : "Room 212",
      "location" : "Entc",
      "path" : "images/room7.jpg"
    })
    room7.save()
    var room8 = ROOM({
      "name" : "Room 310",
      "location" : "Entc",
      "path" : "images/room8.jpg"
    })
    room8.save()
    var room9 = ROOM({
      "name" : "Room 311",
      "location" : "Entc",
      "path" : "images/room9.jpg"
    })
    room9.save()
    res.send("test")
  })
app.listen(3000)
