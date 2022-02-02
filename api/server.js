// IMPORTS AT THE TOP
const express = require('express') // commonjs
// INSTANCE OF EXPRESS APP
const server = express()
// GLOBAL MIDDLEWARE

server.use(express.json()) // parse json from requests
// ENDPOINTS

// [GET]    /             (Hello World endpoint)
// http://cats.com:9000/hello_world
server.get('/hello_world', (req, res) => {
    res.status(200).json('hello world!!!!!!')
  })
// [GET]    /api/dogs     (R of CRUD, fetch all dogs)
// [GET]    /api/dogs/:id (R of CRUD, fetch dog by :id)
// [POST]   /api/dogs     (C of CRUD, create new dog from JSON payload)
// [PUT]    /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)

// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server