var express = require('express');
var router = express.Router();


const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const decodedString = new Buffer(authHeader.split(' ')[1], 'base64').toString();
  const user = decodedString.split(':')[0];
  const pwd =  decodedString.split(':')[1];
  if (!(user === 'admin' && pwd === 'prft')) {
    const err = new Error(`Only Admin has access to Delete method`);
    err.status = 401;
    next(err);
  }
  next();
}

router.route('/')
  .get(function(req, res, next) {
    res.send('respond with a posts');
  })
  .post(verifyAdmin, function(req, res, next) {
    res.end('Inserted some of the posts');
  })

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a posts');
});

router.delete('/',  verifyAdmin, function(req, res, next) {
  res.end('Deleted some of the posts');
});

// delete request only admins has access to it.
module.exports = router;
