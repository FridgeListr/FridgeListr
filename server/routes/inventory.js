const express = require('express');
const router = express.Router();

const invController = require('../controllers/invController');

// GET: all the inventory inside a given fridge
// receive: req.params.fridge_unique_name
// return: { ALL rows in table "food-items" with fridge_unique_name }
router.get('/:fridge_unique_name',
  invController.getAllItems,
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
// receive: req.params.fridge_unique_name
//          req.body = { food_name, OPTIONAL[quantity, unit, date_entered, expiration_date] }
// return: newly created item object
router.post('/:fridge_unique_name',
invController.createItem,
  (req, res) => {
    res.status(200).json(res.locals.food);
  }
);

// PATCH: update information of an existing item based on food_id
// receive: req.params.food_id
//          req.body = {OPTIONAL[food_name, quantity, unit, date_entered, expiration_date]}
// return: {updated item}
router.patch('/:food_id',
  invController.updateItem,
  (req, res) => {
    res.status(200).json(res.locals.food);
  }
);

// DELETE: delete a entry in food-item table based on _id;
// receive: req.params.food_id
// return: { deleted item }
router.delete('/:food_id',
  invController.deleteItem,
  (req, res) => {
    res.status(200).json(res.locals.food);
  }
);

module.exports = router;