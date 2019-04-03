var express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
var router = express.Router();

const {USER}  = require(process.cwd() + '/models/USER');

var key = "!Ng4ckpfpF*M82eqzH#98?uK55&qav5^"

function createJWT(data){
  var token = jwt.sign({
     data: data
   }, key, {
      expiresIn: "30d",
      algorithm: 'HS256'
  });
  return token;
}

router.post('/login', (req, res) => {
  userid = req.body.userid
  password = req.body.password
  USER.find({}, (err, data) => {
    if(err){
      console.log(err);
      res.sendStatus(403)
    }
    else {
      data = data[0]
      bcrypt.compare(password, data.password, function(err, response) {
        if(response) {
         // Passwords match
         res.send({"token" : createJWT(userid)})
        } else {
         // Passwords don't match
         res.sendStatus(401)
        }
      });

    }
  })
})
router.post('/signup', (req, res) => {
  userid = req.body.userid
  password = req.body.password
  bcrypt.hash(password, 10, function(err, hash) {
    var user = new USER({
          userid : userid,
          password : hash,
          role : "user"
        });
       user.save()
});


  res.send({"token" : createJWT(userid)})
})

module.exports = router;
