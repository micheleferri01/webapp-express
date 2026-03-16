function notFound (req, res) {
    res.json({
        success: false,
        message: "endpoint not found"
    });
}

module.exports = notFound;