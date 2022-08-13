const express = require('express');
const app = express();
const path = require("path");


const PORT = process.env.PORT || 3000;

// handle requests for static files for css styling, index.html and bundle.js
// looks for static files, specifically index.html, style.css, index.js
console.log(path.join(__dirname, "../client"));
app.use(express.static(path.join(__dirname, "../")));
app.use(express.static(path.resolve(__dirname, "../bundle")))

app.use('/', (req, res) => {
    res.redirect('/');
})


app.listen(PORT, () => {    
    console.log(`Server listening on port: ${PORT}...`);
});