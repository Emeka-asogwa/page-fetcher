const request = require('request');
const args = process.argv.slice(2);
const url = args[0];
const filePath = args[1];
const fs = require('fs');
const fsSizeBytes = fs.readFileSync(filePath).length;

//------- Alternatively, we can use const fsSizeBytes = fs.statSync(filePath)['size'] to get the total bytes; --------////

request(url, (error, response, body) => {
  fs.writeFile(filePath, body, (err) => {
    
    if (err) {
      throw err;
    }
    console.log(`Downloaded and saved ${fsSizeBytes} bytes to ${filePath}`)
  });

});


  //node fetcher.js http://www.example.edu/ ./index.html

