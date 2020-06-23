const express = require("express")
const app = module.exports = express()
const path = require("path")

const multer = require("multer")
const fs = require("fs")

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({
    storage: storage
})

app.post("/image/upload", upload.single("file"), (req, res, next) => {
    var file = fs.readFileSync(req.file.path)
    var encoded = file.toString('base64')
    
    var image = {
        contentType: req.file.mimetype,
        image: new Buffer(encoded, 'base64')
    }
    
    if (!file) {
        const err = new Error("No file")
        err.httpStatusCode = 400 
        return next(err)
    }

    var publicPath = path.join(__dirname, "../../public")
    fs.writeFile(`${publicPath}/${req.body.name}.${req.file.mimetype.split("/")[1]}`, image.image, (err, writeResponse) => {
        if (err) return next(err)
        res.send(":D")
    })
})

app.get("/", (req, res) => res.send(":D"))