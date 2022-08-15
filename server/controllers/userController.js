const db = require('../../db/db.js');
const userController = {};

const bcrypt = require('bcrypt');

// const workFactor = 10 + Math.floor(Math.random() * 3);
const workFactor = 12;

// test out getting all users. it works!
userController.getAllUser = async (req, res, next) => {
  const getUserQuery = `SELECT * FROM \"user-account\"`;
  db.query(getUserQuery)
    .then(response => {
      // ! changed res.locals.rows into res.locals.users for semantics
      res.locals.users = response.rows;
      return next();
    })
    .catch(err => next({
      log: 'userController.getAllUser went wrong',
      message: { err: 'Error: ' + JSON.stringify(err) }
    }));
};

// test out creating a user
userController.createUser = async (req, res, next) => {
  console.log(req.body);
  const { username, email } = req.body;
  let { password } = req.body;
  // need to make sure data recived from req.body is clean and appropriate


  // console.log(bcrypt.hash(password, workFactor));

  await bcrypt.hash(password, workFactor)
    .then(hash => {
      console.log('password', password);
      console.log('hash', hash);
      password = hash;
    })
    .catch(err => next({
      log: 'userController.createUser went wrong',
      message: { err: 'Error: ' + JSON.stringify(err) }
    }));

  console.log('password after', password);
  console.log(password.length);

  const createUserQuery =
    `INSERT into \"user-account\"(username, password, email)
   VALUES('${username}', '${password}', '${email}')`;

  db.query(createUserQuery)
    .then(response => {
      // console.log('response', response);
      console.log('response rows', response.rows)
      res.locals.user = { username, password };
      // console.log('res locals user', res.locals.user);
      return next();
    })
    .catch(err => next({
      log: 'userController.createUser went wrong',
      message: { err: 'Error: ' + JSON.stringify(err) }
    }));
}

userController.loginUser = async (req, res, next) => {
  // console.log(req.body);
  const { username, password } = req.body;
  // let validUser = false;
  // let { password } = req.body;
  // need to make sure data recived from req.body is clean and appropriate
  // let { password } = req.body;

  // console.log('password before hash', password);

  // await bcrypt.compare()

  // await bcrypt.hash(password, workFactor)
  //   .then(hash => {
  //     console.log('password', password);
  //     console.log('hash', hash);
  //     password = hash;
  //   })
  //   .catch(err => next({
  //     log: 'userController.createUser went wrong',
  //     message: { err: 'Error: ' + JSON.stringify(err) }
  //   }));

  // console.log('password right after hash', password);

  const loginUserQuery =
    `SELECT * FROM \"user-account\" WHERE username=$1`;
  const values = [username];


  // console.log('values array', values);

  let storedHash;


  await db.query(loginUserQuery, values)
    .then(response => {
      // let validUser;
      // console.log('responserows', response);
      console.log('response.rows[0].password', response.rows[0].password);

      storedHash = response.rows[0].password;

      // bcrypt.compare(password, response.rows[0].password)
      //   .then(result => console.log('loggin result', result))
      //   .catch(err => console.log(err));

      res.locals.user = response.rows[0];
      // return next();
    })
    .catch(err => next({
      log: 'userController.loginUser went wrong',
      message: { err: 'Error: ' + JSON.stringify(err) }
    }));

  console.log('storedHash', storedHash);

  bcrypt.compare(password, storedHash)
    .then(validLogin => {
      if (validLogin) return next();

      return next({
        log: 'error on userController.loginUser: Invalid Login',
        message: { err: 'error on userController.loginUser: Invalid Login' }
      })
    })
    .catch(err => console.log(err));
}

userController.createFridge = (req, res, next) => {
  // console.log(req.body);
  const { fridge_unique_name } = req.body;
  // need to make sure data recived from req.body is clean and appropriate
  const createFridgeQuery =
    `INSERT into \"fridge\"(fridge_unique_name)
     VALUES('${fridge_unique_name}')`;
  db.query(createFridgeQuery)
    .then(response => {
      // console.log('THIS IS response', response);
      // console.log('response rows', response.rows)
      res.locals.fridge = fridge_unique_name;
      console.log('res locals fridge', res.locals.fridge);
      return next();
    })
    .catch(err => next({
      log: 'userController.createFridge went wrong',
      message: { err: 'Error: ' + JSON.stringify(err) }
    }));
}

userController.joinFridge = (req, res, next) => {
  // console.log(req.body);

  const { fridge_unique_name, user_id, nickname } = req.body;

  // console.log(fridge_unique_name);
  // console.log(user_id);
  // console.log(nickname);

  // if (nickname === undefined) nickname = null;

  // need to make sure data recived from req.body is clean and appropriate
  const joinFridgeQuery =
    `INSERT INTO \"fridge-join\"(fridge_unique_name, user_id, nickname)
    VALUES('${fridge_unique_name}', ${user_id}, '${nickname}')`;

  // `INSERT into \"user-account\"(username, password, email)
  // VALUES('${username}', '${password}', '${email}')`;

  // console.log(joinFridgeQuery);

  db.query(joinFridgeQuery)
    .then(response => {
      // console.log('THIS IS response', response);
      // console.log('response rows', response.rows)
      res.locals.joinedFridge = { fridge_unique_name, user_id, nickname };
      // console.log('res locals joinedFridge', res.locals.joinedFridge);
      return next();
    })
    .catch(err => next({
      log: 'userController.joinFridge went wrong',
      message: { err: 'Error: ' + JSON.stringify(err) }
    }));
}

module.exports = userController;