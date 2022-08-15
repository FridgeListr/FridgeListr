const express = require('express');
const router = express.Router();

const invController = require('../controllers/invController');

// GET: all the inventory inside a given fridge
// receive: fridge_unique_name
// return: { ALL rows in table "food-items" with fridge_unique_name }
router.get('/:fridge_unique_name',
  invController.getAllFood,
  (req, res) => {
    // this returns an array of objects
    // each object is a food item in the fridge with the following properties
    // { _id, food_name, quantity, unit, expiration_date, fridge_unique_name }
    // date_entered and expiration_date are in "DATE" format
    // example: "2022-08-14T07:00:00.000Z"
    res.status(200).json(res.locals.food);
  }
);

// POST: new item with given information into the database at the fridge_unique_name
// receive: object with food_name, quantity, date_entered, expiration_date, fridge_unique_name
//      ex: { food_name, quantity, unit, date_entered, expiration_date }
// return: nothing || updated item
router.post('/:fridge_unique_name',
invController.createFoodItem,
  (req, res) => {
    res.status(200).json(res.locals.food);
  }
);

// PATCH: update information of an existing food item inside the fridge_unique_name
// receive: { row of a given food_id at all the columns }
// return: nothing || {updated item}
router.patch('/:fridge_unique_name',
  (req, res) => {
    res.status(200).json({});
  }
);

// DELETE: delete a whole row inside a given fridge_unique_name
// receive: food_id
// return: nothing || { deleted item }
router.delete('/:fridge_unique_name',
  (req, res) => {
    res.status(200).json({});
  }
);

module.exports = router;