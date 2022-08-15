const express = require('express');
const app = express();
const path = require("path");

const userRouter = require('./routes/user');
const invRouter = require('./routes/inventory');

const PORT = process.env.PORT || 3000;

// handle requests for static files for css styling, index.html and bundle.js
// looks for static files, specifically index.html, style.css, index.js
app.get('/',(req,res)=>{
    console.log('help')
    return res.status(308).redirect('/login')
})

console.log(path.join(__dirname, "../client"));
app.use(express.static(path.join(__dirname, "../")));
app.use(express.static(path.resolve(__dirname, "../bundle")));

// handle parsing request body
app.use(express.json());

// router to handle all information about fetching user 
app.use('/account', userRouter);
app.use('/inventory', invRouter);


app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname, '../bundle/bundle.html'))
})

app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

// do we need to put this at the very bottom?
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname, '../bundle/bundle.html'))
})
// app.get("*",(req,res)=>{
//     res.sendFile(path.resolve(__dirname, '../bundle/bundle.js'))
// })
 

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
});