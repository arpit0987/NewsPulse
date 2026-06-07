const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello NewsPulse");
});

app.listen(8000, () => {
    console.log("Server started on 8000");
});