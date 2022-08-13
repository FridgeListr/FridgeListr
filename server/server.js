const express = require('express');
const app = express();
const path = require("path");


const PORT = process.env.PORT || 3000;

// handle requests for static files for css styling, index.html and bundle.js
// looks for static files, specifically index.html, style.css, index.js
console.log(path.join(__dirname, "../client"));
app.use(express.static(path.join(__dirname, "../")));
app.use(express.static(path.resolve(__dirname, "../bundle")))

// do we need to put this at the very bottom?
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname, '../bundle/bundle.html'))
})
 

app.listen(PORT, () => {    
    console.log(`Server listening on port: ${PORT}...`);
});