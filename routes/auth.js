const express = require('express');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();
const SECRET_KEY = 'A SECRET KEY';

authRouter.route('/')
  .post((req, res, next) => {
    const body = req.body;
    const userId = body.userId;
    const password = body.password;
    const token = jwt.sign({ userId: userId, isAdmin: true }, SECRET_KEY);
    res.json({ authToken: token });
  });


module.exports = authRouter;
