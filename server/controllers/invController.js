const { query } = require('express');
const db = require('../../db/db.js');
const invController = {};

// middleware to fetch all inventory food-items for a given fridge
// input: req.params.fridge_unique_name
// output: { ALL rows in table "food-items" with fridge_unique_name }
invController.getAllItems = (req, res, next) => {
  const fridge_unique_name = req.params.fridge_unique_name;

  const queryString = 
    `SELECT * FROM "food-item"
     WHERE fridge_unique_name='${fridge_unique_name};'`;
  db.query(queryString)
    .then(response => {
      res.locals.food = response.rows;
      return next();
    })
    .catch(err => next({
      log: 'invController.getAllFood went wrong',
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
  console.log('item is: ', item);
  const keys = Object.keys(item);
  let queryString = 'INSERT INTO "food-item" (';
  let valueString = 'VALUES (';
  const values = [];
  for(let i = 0; i < keys.length; i++){
    queryString += keys[i];
    valueString += `\$${i + 1}`;
    values.push(req.body[keys[i]]);
    // add a comma after the word if this is not the last value
    if(i < keys.length - 1){
      queryString += ', ';
      valueString += ', ';
    } 
  }
  valueString += ')';
  queryString += ') ' + valueString +' RETURNING *;';
  console.log('queryString is: ', queryString);

  db.query(queryString, values)
    .then(response => {
      res.locals.food = response.rows[0]; //response.rows is a single element array
      console.log(res.locals.food);
      return next();
    })
    .catch(err => next({
      log: 'invController.createFoodItem went wrong',
      message: { err: 'Error: ' + JSON.stringify(err) }
    }));
};

// middleware to fetch update an existing item's data in a fridge
// PATCH: update information of an existing food item inside the fridge_unique_name
// receive: req.params.fridge_unique_name,
//          req.body = { _id, OPTIONAL[food_name, quantity, unit, date_entered, expiration_date]}
// return: nothing || {updated item}
invController.updateItem = (req, res, next) => {
  const fridge_unique_name = req.params.fridge_unique_name;

  // a new food-item entry MUST have a food_name
  if(req.body.food_name === undefined) throw new Error('food_name is a required parameter');
  
  // determine which properties have been passed through and build an appropriate
  // query string based on it.
  const keys = Object.keys(req.body);
  let queryString = 'INSERT INTO "food-item" (';
  let valueString = 'VALUES (';
  const values = [];
  for(let i = 0; i < keys.length; i++){
    queryString += keys[i];
    valueString += `\$${i + 1}`;
    values.push(req.body[keys[i]]);
    // add a comma after the word if this is not the last value
    if(i < keys.length - 1){
      queryString += ', ';
      valueString += ', ';
    } 
  }
  valueString += ')';
  queryString += ') ' + valueString +' RETURNING *;';
  console.log('queryString is: ', queryString);

  db.query(queryString, values)
    .then(response => {
      res.locals.food = response.rows[0]; //response.rows is a single element array
      console.log(res.locals.food);
      return next();
    })
    .catch(err => next({
      log: 'invController.createFoodItem went wrong',
      message: { err: 'Error: ' + JSON.stringify(err) }
    }));
};

module.exports = invController;