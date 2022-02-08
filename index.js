// import the server and start it!
// const http = require("http"); // built in node.js module to handle http traffic
const express = require('express');

const port = 3000; // a port we'll use to watch for traffic

const server = express();

// const server = http.createServer((req, res) => {
//     // creates our server
//     res.statusCode = 200; // http status code returned to the client
//     res.setHeader("Content-Type", "text/plain"); // inform the client that we'll be returning text
//     res.end("Hello World from Node\n"); // end the request and send a response with the specified message
// });

server.get('/', (req, res)=> {
  res.send('Hello world from Express!')
})

server.listen(port, () => {
    // start watching for connections on the port specified
    console.log(`Server running on port ${port}/`);
});

//Run CMD
//  node index.js 
//  npm init -y
//  yarn add express
//  npx eslint --init
//  npx gitignore node
//  npm i -D nodemon 
//  npm install express nanoid

// curl localhost:9000/hello_world -v



/** 
 * 12> del git cached
```
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
```
*/
