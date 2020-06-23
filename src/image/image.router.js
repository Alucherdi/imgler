const express = require("express")
const app = module.exports = express()
const path = require("path")

const multer = require("multer")
const fs = require("fs")

var upload = multer({ dest: "public/" })

app.post("/imgler/image/upload", upload.single("file"), (req, res, next) => {
    var response = {code: 2, msg: "File not detected"}

    var file = fs.readFileSync(req.file.path)
    var encoded = file.toString('base64')
    
    var image = Buffer.from(encoded, 'base64')
    
    //no file detected
    if (!file) {
        res.send(response)
    }

    var publicPath = path.join(__dirname, "../../public")
    var fileName = `${req.body.name}.${req.file.mimetype.split("/")[1]}`

    fs.writeFile(`${publicPath}/${fileName}`, image, (err, writeResponse) => {
        //hash removing after saving (or not)
        fs.unlink(req.file.path, () => {})

        response.code = err ? 1 : 0
        response.msg  = err ? "Write error" : "Ok"
        response.url  = err ? "" : `http://dev.playroomsck.com/${fileName}`
        
        res.send(response)
    })
})

app.get("/", (req, res) => res.send(":D"))