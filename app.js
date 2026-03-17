const express = require("express");
const app = express();
const port = process.env.APP_PORT;

const moviesRouter = require ("./routers/moviesRouter");
const notFound = require ("./middlewares/not-found");
const errorsHandler = require("./middlewares/errorsHandler");

const cors = require('cors');

app.use(cors({
    origin: process.env.CORS_URL
}));

app.use(express.static("public"));

app.use("/", moviesRouter);

app.use(errorsHandler);
app.use(notFound);

app.listen( port,() => {
    console.log(`the server is listening on port ${port}`)
})