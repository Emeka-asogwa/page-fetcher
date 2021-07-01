const request = require('request');
const args = process.argv.slice(2);
const url = args[0];
const filePath = args[1];
const fs = require('fs');

//const input = process.argv.slice(2);
// const [server, path] = [input[0], input[1]];

//const fsSizeBytes = fs.readFileSync(filePath).length;
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//------- Alternatively, we can use const fsSizeBytes = fs.statSync(filePath)['size'] to get the total bytes; --------////

/// ----A simple main code before the stretch --////
// request(url, (error, response, body) => {
//   fs.writeFile(filePath, body, (err) => {

//     if (err) {
//       throw err;
//     }

//     console.log(`Downloaded and saved ${fsSizeBytes} bytes to ${filePath}`)
//   });

// });

//Get request
const getResource = (serverAddress, localPath) => {
  request(serverAddress, (error, response, body) => {
    if (error) {
      console.log(error); //This outputs the error message.
      process.exit();
    }
    fs.writeFile(localPath, body, (error) => {//writing the file
      fs.access(localPath, (error) => {
        if (error) console.log(error);
        process.exit();
      });
      if (error) console.log(error);
      console.log(`Downloaded and saved ${body.length} bytes to ${localPath}`);
      rl.close();
    });
  });
};

const pageFetcher = () => {

  if (fs.existsSync(filePath)) {
    rl.question(`${filePath} already exists, if you want to overide file, press y: `, (answer) => {
      if (answer.toLowerCase() === 'y') {
        getResource(url, filePath);
      } else process.exit();
    });
  } else getResource(url, filePath);
};

pageFetcher();

//node fetcher.js http://www.example.edu/ ./index.html

