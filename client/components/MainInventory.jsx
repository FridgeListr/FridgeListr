import React, { useState, useEffect } from 'react';

const MainInventory = (props) => {
    // the food we receive will be limited to the fridge it is in
    const [foodArray, setFoodArray] = useState([]);

    // this is the array that will be rendered
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
            .catch((error) => console.log(error));
    }

    // we will use this get the food array on page load and whenever anything changes?
    useEffect(() => {
        getFoodArray()
    })


    const postFoodItem = () => {
        const postBody = {
            food_name: 1, 
            quantity: 1, 
            unit: 1, 
            date_entered: 1, 
            expiration_date: 1
        }

        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postBody)
        }

        fetch(`/inventory`, postOptions)
            .then((data) => data.json())
            .then((data) => {
                // setFoodArray(data)
            })
            .catch((error) => console.log(error));
    }

    const patchFoodItem = (food_id) => {

    }

    
    const saveFoodChanges = () => {
        
    }

    const delFoodItem = (i) => {
        const delOptions = {
            method: 'DELETE'
        }

        fetch(`/inventory`, delOptions)
            // .then((data) => data.json())
            .then((data) => {
                setFoodArray(data)
            })
            .then((data) => {
                console.log(data)
            })
            .catch((error) => console.log(error));
    }

    const adjustFood = (i, operation) => {
        const newFoodArray = [... foodArray]

        newFoodArray[i].quantity = operation(newFoodArray[i].quantity)

        setFoodArray(newFoodArray)
    }

    // this will update the render component when the food array changes
    useEffect(() => {
        for (let i = 0; i < foodArray.length; i++) {
            foodRender.push(<FoodCard key={i + 1000} food={foodArray[i]} delFoodItem={delFoodItem} i={i} />)
        }
    },
        [foodArray]
    )

    return (
        <div contentEditable>
            {foodRender}
            helloasdas
            {/* <FoodCard /> */}

        </div>
    )
}

export default MainInventory