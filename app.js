const express = require("express");
const app = express();
const port = process.env.APP_PORT;

const moviesRouter = require ("./routers/moviesRouter");
const notFound = require ("./middlewares/not-found");
const errorsHandler = require("./middlewares/errorsHandler");

app.use(express.static("public"));

app.use("/", moviesRouter);

app.use(errorsHandler);
app.use(notFound);

app.listen( port,() => {
    console.log(`the server is listening on port ${port}`)
})