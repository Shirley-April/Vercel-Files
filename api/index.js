const express = require('express')

const app = express()


app.get("/api", (req, res) => {
    res.send("This is the /api route")
})

app.get("/", (req, res) => {
    res.send("This is the / route")
})

const PORT = 3000

app.listen(PORT, () => console.log("App is running on port " + PORT))

module.exports = app