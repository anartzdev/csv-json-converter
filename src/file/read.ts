import fs from 'fs'

let rawdata = fs.readFileSync('./es.json');
let student = JSON.parse(String(rawdata));
console.log(student);