// Importing
const express = require('express');
const app = express();
const config = require('../config.json');

// Importing ShareX
let mainRouter = require('./Sharex/app');


console.log('‎')
console.log('░█████╗░██████╗░███████╗███╗░░██╗██╗░░██╗')
console.log('██╔══██╗██╔══██╗██╔════╝████╗░██║╚██╗██╔╝')
console.log('██║░░██║██████╔╝█████╗░░██╔██╗██║░╚███╔╝░')
console.log('██║░░██║██╔═══╝░██╔══╝░░██║╚████║░██╔██╗░')
console.log('╚█████╔╝██║░░░░░███████╗██║░╚███║██╔╝╚██╗')
console.log('░╚════╝░╚═╝░░░░░╚══════╝╚═╝░░╚══╝╚═╝░░╚═╝')
console.log('‎')
console.log('|Creator: github.com/Wizqdev                              |')
console.log('|Creator: Website: https://wizq.me                        |')
console.log('|Contact: https://discord.com/users/778254181303451658    |')
console.log('‎')

// Running The App 
const Port = config.Web.Port

app.use(mainRouter)
app.listen(Port, () => {
    console.log(`Server Is Running On Port: ${Port}`);
  });