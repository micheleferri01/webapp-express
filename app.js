const express = require("express");
const app = express();
const port = 3000;


app.listen( port,() => {
    console.log(`the server is listening on port ${port}`)
})