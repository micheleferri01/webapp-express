const express = require("express");
const router = express.Router();

const moviesController = require("../controllers/moviesController")

// # index route
router.get("/", moviesController.index);

// # show route
router.get("/:id", moviesController.show);

// # reviews store
router.post("/:id/reviews", moviesController.reviewStore);


module.exports = router;