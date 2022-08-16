// import 'isomorphic-fetch';
import React, { useState, useEffect } from 'react';

// create a container to hold queried data
const Activity = (props) => {
  
  // useEffect(() => {
  //   console.log('C+SY, getAll is being invoked!');
  //   console.log('This is the food array in useEffect', props.foodArray);
  //   getAll(props.foodArray);
  // },[]);
  
  const [table, setTable] = useState([]);
  const [expirationTable, setExpirationTable] = useState([]);

  console.log('This is the table contents: ', table);
  const re = /(.+?(?=T))/;
  
  // trim string from food date_entered
  const getAll = () => {
    const tempTable = [];
    props.foodArray.forEach(food => {
      console.log('quantity is: ', food.quantity, ', food is: ',food.food_name);
      tempTable.push(
      <li>
        You added {food.quantity} {food.food_name} on {food.date_entered.substring(0,10)}
      </li>);
    });
    setTable(tempTable);
  }
  useEffect(() => {
    console.log('C+SY, getAll is being invoked!');
    getAll();
    getExpirationAlerts();
  },[props.foodArray]);
  
  const getExpirationAlerts = () => {
    const tempTable = [];
    const today = Date.now();
    const EXP_DAYS = 7;
    // EXPIRATION TIME as seconds
    const EXP_TIME = EXP_DAYS * 24 * 60 * 60 * 1000;
    props.foodArray.forEach(food => {
      // console.log('Expiration date in second: ', food.expiration_date.getTime());
      const seconds = Date.parse(food.expiration_date);
      const days = Math.floor((seconds - today) / (24 * 60 * 60 * 1000));
      if(seconds - today < EXP_TIME){
        const expiration_text = `${food.food_name} is expiring in ${days} days!`;
        tempTable.push(
          <li className='expiryText'>{expiration_text}</li>
        )
      }
      // console.log('seconds till expiration: ', date.getTime());
    });
    setExpirationTable(tempTable);
  };

    return (
        <div id="activityContainer">
            <h1>Activity Log</h1>
            <ul>
              <h2>Expiring Soon</h2>
              {expirationTable}
              <h2>Recent Activity</h2>
              {table}
            </ul>
        </div>
    );
}

/* Select data from DB with food expiring within 3 days
will need to get current date, and compare with all dates from DB */

// Group expiring foods

export default Activity;