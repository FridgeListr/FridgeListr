const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// helper function to get all user information
router.get('/', userController.getAllUser,
  (req, res) => {
    // ! changed res.locals.rows into res.locals.users for semantics
    res.status(200).json(res.locals.users);
    // res.status(200).json(true);
  }
);

// POST: login functionality
// expecting to receive {username, password}
// return... something?? Verification? (true or false, redirect to successful login or not)
router.post('/login', userController.loginUser,
  (req, res) => {
    let output;
    res.locals.user ? output = true : output = false;
    res.status(200).json(output);
  }
);

// GET: account/login
// receive: cookie
// return: {user_id, fridge_arrray, default_fridge}
// ! Check in with Lenny/Carlos
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
router.post('/fridge/new', userController.createFridge,
  (req, res) => {
    res.status(200).json(res.locals.fridge);
  }
);

// POST: join an pre-existing fridge
// receive: req.body = {fridge_unique_name, user_id}
// ! receive: req.body = { fridge_unique_name, user_id, nickname }
// ! I'm not sure but I think I should be given nickname at the request
// return : ?? all food from fride_unique_name?
router.post('/fridge/join', userController.joinFridge,
  (req, res) => {
    res.status(200).json(res.locals.joinedFridge);
  }
);

module.exports = router;