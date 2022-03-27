const yes = require('./structure/userData')
const moment = require('moment');
const file = require('./structure/fileData')

let files = new file(require('path').join(__dirname, 'data.txt'))
let me = files.subjects.find(sub => sub.fullName == "JONATHAN SCOTT").details.timeRemaining
console.log(me)