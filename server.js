const express = require('express');
const cors = require('cors');
var hbs = require('hbs');
const jwt = require('jsonwebtoken');
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
const hbss = require('express-handlebars');
app.engine('hbss', hbss({extname: 'hbs', layoutsDir: __dirname+'views/'}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
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
    verifyJWT(req.header('x-auth-token'))
      .then((decodedToken) =>
      {
          var dateNow = new Date();
          res.locals.userid = decodedToken.data;
          next()

      })
      .catch((err) =>
      {
        res.status(400)
          .json({message: "Invalid auth token provided." + err})
      })

  })
  //hello
  app.get("/test", (req, res) => {
    var feedbacks = new FEEDBACK({
      "username" : "amey",
      "comment" : "nice service"
     })
     feedbacks.save()
    // var room1 = ROOM({
    //   "name" : "Room 212",
    //   "location" : "Comp",
    //   "path" : "images/room1.jpg"
    // })
    // room1.save()
    // var room2  = ROOM({
    //   "name" : "Room 311",
    //   "location" : "Comp",
    //   "path" : "images/room2.jpg"
    // })
    // room2.save()
    // var room3 = ROOM({
    //   "name" : "Room 310",
    //   "location" : "Comp",
    //   "path" : "images/room3.jpg"
    // })
    // room3.save()
    // var room4 = ROOM({
    //   "name" : "Room 212",
    //   "location" : "IT",
    //   "path" : "images/room4.jpg"
    // })
    // room4.save()
    // var room5 = ROOM({
    //   "name" : "Room 311",
    //   "location" : "IT",
    //   "path" : "images/room5.jpg"
    // })
    // room5.save()
    // var room6 = ROOM({
    //   "name" : "Room 310",
    //   "location" : "IT",
    //   "path" : "images/room6.jpg"
    // })
    // room6.save()
    // var room7 = ROOM({
    //   "name" : "Room 212",
    //   "location" : "Entc",
    //   "path" : "images/room7.jpg"
    // })
    // room7.save()
    // var room8 = ROOM({
    //   "name" : "Room 310",
    //   "location" : "Entc",
    //   "path" : "images/room8.jpg"
    // })
    // room8.save()
    // var room9 = ROOM({
    //   "name" : "Room 311",
    //   "location" : "Entc",
    //   "path" : "images/room9.jpg"
    // })
    // room9.save()
    res.send("test")
  })
  require('./amey/main')(app, router);
  require('./ronit/main')(app, router);
app.use("/", router)

app.listen(3000)
