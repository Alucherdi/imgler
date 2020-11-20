const express = require("express")
const app = module.exports = express()

app.use("/imgler/assets/", express.static('public'));

app.use(require("./src/image/image.router"))
app.use(require("./src/file/file.router"))

app.listen(5432, () => {
    console.log("Listening to 5432")
})
