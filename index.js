// import the server and start it!
const server =require('./api/server')
// const express = require('express') // commonjs
// import express from 'express'



// api is made of endpoints such as
// // http://cats.com:9000/hello_world
// server.get('/hello_world', (req, res) => {
//   res.json('hello world!')
// })

server.listen(9000, () => {
  console.log('listening on port 9000')
})