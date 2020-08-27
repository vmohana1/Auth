var express = require('express');
const jwt = require('jsonwebtoken');

const authRouter = require('./auth');
var router = express.Router();

const SECRET_KEY = 'A SECRET KEY';

const verifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  const payload = jwt.verify(token, SECRET_KEY);
  const { userId, isAdmin } = payload;
  next();
}


const comments = [ {
  comment: 'hello',
  author: 'user1'
}, {
  comment: 'comment2',
  author: 'user2'
}];

/* GET users listing. */
router.get('/', verifyUser, function(req, res, next) {
  res.json(comments);
});

router.delete('/', function(req, res, next) {
  res.end('Deleted some of the posts');
});

// delete request only admins has access to it.
module.exports = router;
