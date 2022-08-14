const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// helper function to get all user information
router.get('/', userController.getAllUser,
  (req, res) => {
    res.status(200).json(res.locals.rows);
  }
);

// POST: login functionality
// expecting to receive {username, password}
// return... something?? Verification? (true or false, redirect to successful login or not)
router.post('/login',
  (req, res) => {
    res.status(200).json({});
  }
);

// GET: account/login
// receive: cookie
// return: {user_id, fridge_arrray, default_fridge}
router.get('/login',
  (req, res) => {
    res.status(200).json({});
  }
);

//POST: creating a new user
// receive req.body = {username, password, email}
// return username/password object of the created user
router.post('/signup',
  userController.createUser,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

// create a fridge
// POST: /fridge/new
// receive: nickname
// return: fridge_unique_name
router.post('/fridge/new',
  (req, res) => {
    res.status(200).json();
  }
);

//POST: join an pre-existing fridge
// receive: req.body = {fridge_unique_name, user_id}
// return : ?? all food from fride_unique_name?
router.post('/fridge/join',
  (req, res) => {
    res.status(200).json();
  }
);

module.exports = router;