const { query } = require('express');
const db = require('../../db/db.js');
const invController = {};

// middleware to fetch all inventory food-items for a given fridge
// req.params includes fridge_unique_name
// need to return an array of all item objects 
invController.getAllFood = (req, res, next) => {
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
// input: req.body contains a food item object with relevant info
// output: return the newly created food object (optional?)
invController.createFoodItem = (req, res, next) => {
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