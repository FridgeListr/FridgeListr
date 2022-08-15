import React, { useState, useEffect } from 'react';
import FoodCard from './FoodCard.jsx';
import SelectedFood from './SelectedFood';

const MainInventory = (props) => {
    const [selectedFood, setSelectedFood] = useState(<SelectedFood food={props.foodArray[0]} key={100}/>);
   

    // this is the array that will be rendered
    const [foodRender , setFoodRender]= useState([]);

const foodFormSubmit = (action) => {
    if (action === 'POST'){
        postFoodItem()
    } else {
        console.log('patch')
    }
}

    const postFoodItem = () => {
        console.log('posted!')
        // const postBody = {
        //     food_name: 1, 
        //     quantity: 1, 
        //     unit: 1, 
        //     date_entered: 1, 
        //     expiration_date: 1
        // }

        // const postOptions = {
        //     method: foodAction,
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(postBody)
        // }
        // console.log(postOptions)
        // fetch(`/inventory`, postOptions)
        // .then((data) => {
        //     props.setFoodArray(data)
        //     console.log(data)
        // })
        // .then((data) => data.json())
        //     .catch((error) => console.log(error));
    }

    const selectFood = (i) => {
        console.log('buttonclicked', props.foodArray[i])
        setSelectedFood(<SelectedFood food={props.foodArray[i]} foodFormSubmit={foodFormSubmit} key={100}/>)
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
            {foodRender}
            {selectedFood}
            <div id='selection-buttons'>
                <button id='add-food' onClick={()=> selectFood(1)}>Add</button>
                <button id='update-food'>Update</button>
                temp
            </div>
        </div>
    )
}

export default MainInventory