const express = require("express")
const app = module.exports = express()

app.use(express.static('public'));

app.use(require("./src/image/image.router"))

app.listen(8080, () => {
    console.log("Listening to 8080")
})