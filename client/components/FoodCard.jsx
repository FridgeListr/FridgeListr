import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const FoodCard = (props) => {
    const { _id, food_name, quantity, unit, date_entered, expiration_date } = props.food


    const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

    return (
        <>
            <div className='food-card' onClick={() => props.selectFood(props.i)}>
                <h1>{food_name}</h1>
                <p><b>Quantity:</b> {quantity} {unit}</p>
                <p><b>Date Entered:</b>{date_entered}</p>
                <p><b>Expiration Date:</b>{expiration_date}</p>
            </div>
            <button onClick={() => props.delFoodItem(_id)}>DELETE THIS ITEM</button>
            <br></br>
            <br></br>
            <br></br>
            {/* <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                        be{bull}nev{bull}o{bull}lent
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card> */}


        </>
    )

}

export default FoodCard



// import * as React from 'react';
// import Box from '@material-ui/core/Box';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

// const bull = (
//     <Box
//         component="span"
//         sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//     >
//         •
//     </Box>
// );

// export default function BasicCard() {
//     return (
//         <Card sx={{ minWidth: 275 }}>
//             <CardContent>
//                 <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//                     Word of the Day
//                 </Typography>
//                 <Typography variant="h5" component="div">
//                     be{bull}nev{bull}o{bull}lent
//                 </Typography>
//                 <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                     adjective
//                 </Typography>
//                 <Typography variant="body2">
//                     well meaning and kindly.
//                     <br />
//                     {'"a benevolent smile"'}
//                 </Typography>
//             </CardContent>
//             <CardActions>
//                 <Button size="small">Learn More</Button>
//             </CardActions>
//         </Card>
//     );
// }