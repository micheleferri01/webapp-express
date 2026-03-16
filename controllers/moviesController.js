const connection = require("../database/connection");

function index (req, res) {
    const sql = "SELECT * FROM movies";
    connection.query (sql, (err, results) => {
        handleFailedQuery(err, res);
        res.json({
            success: true,
            results: results
        });
    })
}

function show (req, res) {
    const id = req.params.id;

    const sql = "SELECT * FROM movies WHERE id = ?";
    connection.query(sql,[id], (err, results) => {
        handleFailedQuery(err, res);

        if(results.length === 0) return res.status(404).json({
            success: false,
            message: "Movie not found."
        });

        res.json({
            success: true,
            results: results
        });
    })
}

function handleFailedQuery (err,res) {
    if (err) {
        const responseData = {
            success: false,
            message: "Database query failed",
        };

        if (process.env.APP_MODE === "dev") {
            responseData.error = err.message;
        }
        console.log(err.message)

        return res.status(500).json(responseData);
    }
}

module.exports = {index, show};