const express = require("express");
const app = express();
const port = 8282;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`[EXPRESS] Start listening at port: ${port}`);
});
