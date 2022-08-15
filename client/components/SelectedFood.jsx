import React, { useState, useEffect } from 'react';

const SelectedFood = (props) => {
    const [foodAction, setFoodAction] = useState('POST');
    
    // let food_name;
    // let quantity;
    // let unit;
    // let date_entered;
    // let expiration_date ;

    console.log('selectedfood')
    if (props.food) {
        console.log('selectedfood', props.food);
        var { food_name, quantity, unit, date_entered, expiration_date } = props.food
    } else {
        var [food_name, quantity, unit, date_entered, expiration_date] = Array(5)
    }

    Date.prototype.toDateInputValue = (function () {
        const local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    });

    Date.prototype.toDateInputExpirationValue = (function () {
        const local = new Date(this);
        local.setDate(local.getDate() + 7)
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    });

    return (
        <form onSubmit={(event) => {
            event.preventDefault()
            props.foodFormSubmit(foodAction)
        }}>
            Food: <input id='input-food_name' type='text' placeholder='Food Name' defaultValue={food_name}></input><br></br>
            Quantity: <input id='input-quantity' type='text' placeholder='Enter Quantity' defaultValue={quantity}></input>
            Units: <input id='input-unit' type='text' placeholder='Units' defaultValue={unit}></input><br></br>
            Date Entered: <input id='input-date' type='date' placeholder='Date' defaultValue={new Date().toDateInputValue()}></input><br></br>
            Expiration Date: <input id='input-date' type='date' placeholder='Date' defaultValue={new Date().toDateInputExpirationValue()}></input><br></br>
            <input id='input-add' type='submit' value='Add new item' onClick={() => setFoodAction('POST')}></input>
            <input id='input-update' type='submit' value='Update selected item' onClick={() => setFoodAction('PATCH')}></input>
        </form>

    )
}

export default SelectedFood