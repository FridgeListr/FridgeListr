import React, { useState, useEffect } from 'react';

const SelectedFood = (props) => {
    const [foodAction, setFoodAction] = useState('POST');
    let dateArray = [];

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
    const todayDate = new Date().toDateInputValue();
    const todayexpiration_date = new Date().toDateInputExpirationValue();
    // console.log('selectedfood', props.food)
    if (props.food) {
        // console.log('selectedfood', props.food);
        var { _id, food_name, quantity, unit, date_entered, expiration_date } = props.food
        date_entered = date_entered.slice(0, 10)
        expiration_date = expiration_date.slice(0, 10)
    } else {
        var [food_name, quantity, unit, date_entered, expiration_date] = Array(5)
        //     date_entered = todayDate;
        //     expiration_date = todayexpiration_date;
    }
    // console.log('today', date_entered)
    return (
        <>
            <h1>Add something to your fridge!</h1>
            <form onSubmit={(event) => {
                event.preventDefault()
                props.foodFormSubmit(foodAction, _id)
            }}>
                Food: <input id='input-food_name' type='text' placeholder='Food Name' defaultValue={food_name}></input><br></br>
                Quantity: <input id='input-quantity' type='text' placeholder='Enter Quantity' defaultValue={quantity}></input>
                Units: <input id='input-unit' type='text' placeholder='Units' defaultValue={unit}></input><br></br>
                Date Entered: <input id='input-date-entered' type='date' placeholder='Date' defaultValue={date_entered}></input><br></br>
                Expiration Date: <input id='input-date-expired' type='date' placeholder='Date' defaultValue={expiration_date}></input><br></br>
                <input id='input-add' type='submit' value='Add new item' onClick={() => setFoodAction('POST')}></input>
                <input id='input-update' type='submit' value='Update selected item' onClick={() => setFoodAction('PATCH')}></input>
            </form>
        </>
    )
}

export default SelectedFood