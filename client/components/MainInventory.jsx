import React, { useState, useEffect } from 'react';

const MainInventory = (props) => {
    // the food we receive will be limited to the fridge it is in
    const [foodArray, setFoodArray] = useState([]);

    const foodRender = [];
    // const defaultFridge


    const getFoodArray = () => {
        const getOptions = {
            method: 'GET'
        }

        fetch(`/inventory/?fridge_id=${props.defaultFridge}`, getOptions)
            .then((data) => data.json())
            .then((data) => {
                setFoodArray(data)
            })
    }

    // this will update the render component when the food array changes
    useEffect(() => {
        for (let i = 0; i < foodArray.length; i++) {
            foodRender.push(<FoodCard key={i + 1000} food={foodArray[i]} />)
        }
    },
        [foodArray]
    )

    return(
        <div>
            {foodRender}
        </div>
    )
}

export default MainInventory