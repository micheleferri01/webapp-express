const express = require("express");
const app = express();
const port = process.env.APP_PORT;

const moviesRouter = require ("./routers/moviesRouter");

app.use(express.static("public"));

app.use("/", moviesRouter);

app.listen( port,() => {
    console.log(`the server is listening on port ${port}`)
})