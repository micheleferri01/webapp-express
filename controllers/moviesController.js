const connection = require("../database/connection");

function index(req, res) {
    const sql = "SELECT * FROM movies";
    connection.query(sql, (err, results) => {
        handleFailedQuery(err, res);

        const movies = results.map((movie) => {
            const imagePath = imagePathBuilder(movie.image);
            return { ...movie, image: imagePath };
        })

        res.json({
            success: true,
            results: movies
        });
    })
}

function show(req, res) {
    const id = req.params.id;

    const sql = "SELECT * FROM movies WHERE id = ?";
    connection.query(sql, [id], (err, results) => {
        handleFailedQuery(err, res);

        if (results.length === 0) return res.status(404).json({
            success: false,
            message: "Movie not found."
        });

        const movies = results.map((movie) => {
            const imagePath = imagePathBuilder(movie.image);
            return { ...movie, image: imagePath };
        })

        const reviewsSql = 'SELECT reviews.id, reviews.name, reviews.vote, reviews.text FROM reviews WHERE movie_id = ?';
        connection.query(reviewsSql, [id], (err, reviewsRes) => {
            handleFailedQuery(err, res);

            
            res.json({
                success: true,
                results: movies,
                reviews: reviewsRes
            });

        })


    })
}

function reviewStore (req, res) {
    const {id} = req.params;
    const {name, text, vote} = req.body;
    const sql = `INSERT INTO reviews (movie_id, name, text, vote) VALUES (?,?,?,?)`;

    connection.query(sql,[id, name, text, vote],(err, results) => {
        handleFailedQuery(err, res);
        res.json({
            success: true,
            message: "review posted"
        })
    });
}

function handleFailedQuery(err, res) {
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
};

function imagePathBuilder(image) {
    return `${process.env.APP_URL}:${process.env.APP_PORT}/img/${image}`
}

module.exports = { index, show, reviewStore};