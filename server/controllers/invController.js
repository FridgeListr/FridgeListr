const db = require('../../db/db.js');
const invController = {};

// test out getting all users. it works!
// invController.getAllUser = (req, res, next) => {
//   const getUserQuery = `SELECT * FROM \"user-account\"`;
//   db.query(getUserQuery)
//     .then(response => {
//       res.locals.rows = response.rows;
//       return next();
//     })
//     .catch(err => next({
//       log: 'invController.getAllUser went wrong',
//       message: { err: 'Error: ' + JSON.stringify(err) }
//     }));
// };

// test out creating a user
// invController.createUser = (req, res, next) => {
//   console.log(req.body);
//   const { username, password, email } = req.body;
//   // need to make sure data recived from req.body is clean and appropriate
//   const createUserQuery =
//     `INSERT into \"user-account\"(username, password, email)
//      VALUES('${username}', '${password}', '${email}')`;
//   db.query(createUserQuery)
//     .then(response => {
//       res.locals.user = response.rows;
//       return next();
//     })
//     .catch(err => next({
//       log: 'invController.createUser went wrong',
//       message: { err: 'Error: ' + JSON.stringify(err) }
//     }));
// }

module.exports = invController;