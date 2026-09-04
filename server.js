const express = require("express");
const path = require("path");
const { exec } = require("child_process");

const app = express();

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on http://localhost:3000");

    exec("start http://localhost:3000");
});