import React from 'react';

const FoodCard = (props) => {
    const { food_name, quantity, unit, date_entered, expiration_date } = props.food

    // if (unit){
    //     unit = ''
    // }

return(
    <div className='food-card' onClick={()=> props.selectFood(props.i)}>
        <h1>{food_name}</h1>
        <p><b>Quantity:</b> {quantity} {unit}</p>
        <p><b>Date Entered:</b>{date_entered}</p>
        <p><b>Expiration Date:</b>{expiration_date}</p>
    </div>
)

}

export default FoodCard