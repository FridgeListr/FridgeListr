const { query } = require('express');
const db = require('../../db/db.js');
const invController = {};

// middleware to fetch all inventory food-items for a given fridge
// input: req.params.fridge_unique_name
// output: { ALL rows in table "food-items" with fridge_unique_name }
invController.getAllItems = (req, res, next) => {
  const fridge_unique_name = req.params.fridge_unique_name;
  if(fridge_unique_name === undefined) throw new Error('fridge_unique_name is a required parameter.')

  const queryString = 'SELECT * FROM "food-item" WHERE fridge_unique_name=$1 ORDER BY _id;';
  const values = [fridge_unique_name];
  db.query(queryString, values)
    .then(response => {
      res.locals.food = response.rows;
      return next();
    })
    .catch(err => next({
      log: 'invController.getAllItems went wrong',
      message: { err: 'Error: ' + JSON.stringify(err) }
    }));
};

// middleware to fetch create a new food-item in a fridge
// input: req.params.fridge_unique_name
//          req.body = { food_name, OPTIONAL[quantity, unit, date_entered, expiration_date] }
// output: newly created item object
invController.createItem = (req, res, next) => {
  const fridge_unique_name = req.params.fridge_unique_name;

  // a new food-item entry MUST have a food_name
  if(req.body.food_name === undefined) throw new Error('food_name is a required parameter');
  
  // determine which properties have been passed through and build an appropriate
  // query string based on it.
  const item = Object.assign(req.body, { fridge_unique_name });
  const keys = Object.keys(item);
  let queryString = 'INSERT INTO "food-item" (';
  let valueString = 'VALUES (';
  const values = [];
  for(let i = 0; i < keys.length; i++){
    queryString += keys[i];
    valueString += `\$${i + 1}`;
    values.push(item[keys[i]]);
    // add a comma after the word if this is not the last value
    if(i < keys.length - 1){
      queryString += ', ';
      valueString += ', ';
    } 
  }
  valueString += ')';
  queryString += ') ' + valueString +' RETURNING *;';
  // console.log('queryString is: ', queryString);

  db.query(queryString, values)
    .then(response => {
      res.locals.food = response.rows[0]; //response.rows is a single element array
      // console.log(res.locals.food);
      return next();
    })
    .catch(err => next({
      log: 'invController.createItem went wrong',
      message: { err: 'Error: ' + JSON.stringify(err) }
    }));
};

// middleware to update an existing item's data in a fridge
// input: req.params.food_id,
//          req.body = { OPTIONAL[food_name, quantity, unit, date_entered, expiration_date]}
// output: {updated item}
invController.updateItem = (req, res, next) => {
  // an update query requires an food_id
  // console.log(req.params.food_id);
  if(req.params.food_id === undefined) throw new Error('_id is a required parameter');
  
  // determine which properties have been passed through and build an appropriate
  // query string based on it.
  const item = Object.assign({ _id: req.params.food_id }, req.body);
  const keys = Object.keys(item);
  let queryString = 'UPDATE "food-item" SET ';
  const values = [];
  for(let i = 0; i < keys.length; i++){
    queryString += keys[i] +` = \$${i + 1}`;
    values.push(item[keys[i]]);
    // add a comma after the word if this is not the last value
    if(i < keys.length - 1){
      queryString += ', ';
    } 
  }
  queryString += ' WHERE _id = $1 RETURNING *;';
  // console.log('queryString is: ', queryString);
  // console.log('values is: ', values);

  db.query(queryString, values)
    .then(response => {
      res.locals.food = response.rows[0]; //response.rows is a single element array
      // console.log(res.locals.food);
      return next();
    })
    .catch(err => next({
      log: 'invController.updateItem went wrong',
      message: { err: 'Error: ' + JSON.stringify(err) }
    }));
};

// middleware to delete an item in food-item table
// input: req.params.food_id
// output: {deleted item}
invController.deleteItem = (req, res, next) => {
  // a delete query requires an food_id
  // console.log(req.params.food_id);
  if(req.params.food_id === undefined) throw new Error('_id is a required parameter');
  
  // query string based on it.
  let queryString = 'DELETE FROM "food-item" WHERE _id = $1 RETURNING *;';
  const values = [req.params.food_id];
  
  db.query(queryString, values)
    .then(response => {
      res.locals.food = response.rows[0]; //response.rows is a single element array
      // console.log(res.locals.food);
      return next();
    })
    .catch(err => next({
      log: 'invController.deleteItem went wrong',
      message: { err: 'Error: ' + JSON.stringify(err) }
    }));
};

module.exports = invController;