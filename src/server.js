//create express app
const express = require('express');
const app = express();

// initialize server port 
const PORT = process.env.PORT || 3000;

// connect to the database
const db = require("./database.js")

// parse through incoming data through HTTP requests
app.use(express.json());

// start server
app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));

// root endpoint
app.get("/", (req, res, next) => {
    res.json({message: "You have reached the root of the Car Data API for CISC 3140 Lab 4."})
});

// Display results of all cars present in the CSV file
// http://localhost:3000/cars
app.get("/cars", (req, res, next) => {
    db.all("SELECT * FROM Rank", [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ rows });
    });
});
