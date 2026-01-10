import fs from 'fs';
const csv = require('csv-parser')
const filePath = 'database.csv'
let username = '';

fs.createReadStream(filePath)
    .pipe(csv())
    .on('database', (row) => {
    ages.push(parseInt(row.username)); // Add age to the array, convert to integer
})
    .on('end', () => {
    console.log(ages);
  });


