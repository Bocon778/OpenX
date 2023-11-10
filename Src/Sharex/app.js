const express = require('express');
const app = express();
const router = express.Router();
const ejs = require('ejs');
const fs = require("node:fs")
const isBot = require("is-bot")
const bodyParser = require('body-parser');
const path = require('path');
const {getFileType} = require("../util/fileutil.js")


// Routing
// UploadApi Router
const uploadRouter = require('./Api/uploadApi');
router.use('/api', uploadRouter);

router.get('/', (req, res) => {
    console.log(__dirname);
    res.render('index.ejs');
});

router.get('/i/:filename', (req, res) => {
    console.log(`Received a thing for file name ${req.params.filename}`);
    let fileType = getFileType(req.params.filename);
    if(fileType==="other") {
        return res.sendStatus(400);
    }
    res.render("i/index.ejs", {filename: req.params.filename, fileType})
})

router.get('/raw/i/:filename', (req, res, next) => {
    // if(!isBot(req.headers["user-agent"])) {
    //     return res.redirect(`/i/${req.params.filename}`);
    // }
    // next();
    let fileName = req.params.filename
    let fileType = getFileType(fileName);
    if(fileType==="other") {
        return res.sendStatus(400);
    }
    let filePath = path.join(__dirname, "../../", "Uploads", (fileType.charAt(0).toUpperCase() + fileType.slice(1)), fileName);

    console.log(filePath);
    
    if(!fs.existsSync(filePath)) {
        return res.sendStatus(404);
    }
    res.sendFile(filePath);
})


module.exports = router