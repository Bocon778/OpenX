// Importing
const express = require('express');
const app = express();
const path = require("path")
const config = require('../config.json');


// Importing ShareX
let mainRouter = require('./Sharex/app');

console.clear()
console.log('‎')
console.log('░█████╗░██████╗░███████╗███╗░░██╗██╗░░██╗')
console.log('██╔══██╗██╔══██╗██╔════╝████╗░██║╚██╗██╔╝')
console.log('██║░░██║██████╔╝█████╗░░██╔██╗██║░╚███╔╝░')
console.log('██║░░██║██╔═══╝░██╔══╝░░██║╚████║░██╔██╗░')
console.log('╚█████╔╝██║░░░░░███████╗██║░╚███║██╔╝╚██╗')
console.log('░╚════╝░╚═╝░░░░░╚══════╝╚═╝░░╚══╝╚═╝░░╚═╝')
console.log('‎')
console.log('|Creator: github.com/Wizqdev           |')
console.log('|Creator: Website: https://wizq.me     |')
console.log('|Contact: https://wizq.dev/discord     |')
console.log('‎')



// Setting The View Point
app.enable("trust proxy")
app.set('views',path.join(__dirname, "Pages"));
app.set('view engine','ejs');

// Running The App 
const Port = config.Web.Port

app.use(mainRouter)
app.listen(Port, () => {
    console.log(`Server Is Running On Port: ${Port}`);
});