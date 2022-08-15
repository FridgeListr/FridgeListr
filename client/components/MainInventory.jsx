import React, { useState, useEffect } from 'react';
import FoodCard from './FoodCard.jsx';
import SelectedFood from './SelectedFood';

const MainInventory = (props) => {
    
    
    // this is the array that will be rendered
    const [foodRender, setFoodRender] = useState([]);
    
    const foodFormSubmit = (action, food_id) => {
        if (action === 'POST') {
            postFoodItem()
        } else {
            patchFoodItem(food_id)
        }
    }

    const [selectedFood, setSelectedFood] = useState(<SelectedFood food={props.foodArray[0]} foodFormSubmit={foodFormSubmit} key={100} />);

    const postFoodItem = () => {
        console.log('posted!')
        const postBody = {
            food_name: document.getElementById('input-food_name').value,
            quantity: document.getElementById('input-quantity').value, 
            unit: document.getElementById('input-unit').value, 
            date_entered: document.getElementById('input-date-entered').value, 
            expiration_date: document.getElementById('input-date-expired').value
        }

        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postBody)
        }
        console.log(postOptions)
        fetch(`/inventory/olaf`, postOptions)
        .then((data) => {
            // props.setFoodArray(data)
            // console.log(data)
            // props.getFoodArray()
        })
            .catch((error) => console.log(error));
    }
    const patchFoodItem = (food_id) => {
        console.log('patched!', food_id)
        const postBody = {
            food_name: document.getElementById('input-food_name').value,
            quantity: document.getElementById('input-quantity').value, 
            unit: document.getElementById('input-unit').value, 
            date_entered: document.getElementById('input-date-entered').value, 
            expiration_date: document.getElementById('input-date-expired').value
        }

        const postOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postBody)
        }
        console.log(postOptions)
        fetch(`/inventory/${food_id}`, postOptions)
        .then((data) => {
            // props.setFoodArray(data)
            // console.log(data)
            // props.getFoodArray()
        })
            .catch((error) => console.log(error));
    }

    const selectFood = (i) => {
        console.log('buttonclicked', props.foodArray[i])
        setSelectedFood(<SelectedFood food={props.foodArray[i]} foodFormSubmit={foodFormSubmit} key={100} />)
    }


    const delFoodItem = (i) => {
        const delOptions = {
            method: 'DELETE'
        }

        fetch(`/inventory`, delOptions)
            // .then((data) => data.json())
            .then((data) => {
                props.setFoodArray(data)
            })
            .then((data) => {
                console.log(data)
            })
            .catch((error) => console.log(error));
    }

    const adjustFood = (i, operation) => {
        const newFoodArray = [...props.foodArray]

        newFoodArray[i].quantity = operation(newFoodArray[i].quantity)

        props.setFoodArray(newFoodArray)
    }

    // this will update the render component when the food array changes
    useEffect(() => {
        console.log('useeffect forprops.foodArray')
        console.log(props.foodArray[0])
        const tempArr = [];
        for (let i = 0; i < props.foodArray.length; i++) {
            tempArr.push(<FoodCard key={i + 1000} food={props.foodArray[i]} delFoodItem={delFoodItem} i={i} selectFood={selectFood} />)
        }
        setFoodRender(tempArr);
        // console.log('foodrender', tempArr[0])
    },
        [props.foodArray]
    )

    return (
        <div id='main-inventory'>
            Main Inventory!
            {selectedFood}
            {/* <div id='selection-buttons'> */}
                <button id='clear-food' onClick={() => setSelectedFood(<SelectedFood food={undefined} foodFormSubmit={foodFormSubmit} key={100} />)}>Clear Food</button>
                {/* <button id='update-food'>Update</button> */}
                
            {/* </div> */}
            {foodRender}
        </div>
    )
}

export default MainInventory