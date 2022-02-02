// IMPORTS AT THE TOP
const express = require('express') // commonjs
const Dog = require('./dog-model.js')
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
// server.get('/api/dogs', async(req, res) => {
//     // res.json('all the dogs')
//     try{
//         const dogs = await Dog.findAll()
//         res.json(dogs)
//     }catch(err) {
//         res.status(500).json({message: err.message})
//     }
// })

server.get('/api/dogs', (req, res) => {
    // res.json('all the dogs')
    Dog.findAll()
        .then( dogs =>{
            res.json(dogs)
        })
        .catch( err => {
            res.status(500).json({message: err.message})
        })
})
// [GET]    /api/dogs/:id (R of CRUD, fetch dog by :id)
server.get('/api/dogs/:id', async (req, res) => {
    console.log(req.method)
    console.log(req.headers)
    console.log(req.body)
    console.log(req.params)
    console.log(req.params.id)
    // res.json('test req by endpoint')
    try {
        // w 1
        // const dog = await Dog.findById(req.params.id)
        // res.json(dog)
        // w 2
        //   const { id } = req.params
        //   const dog = await Dog.findById(id)
        //   res.status(200).json(dog)
        // w 3
        const { id } = req.params
        const dog = await Dog.findById(id)
        if (!dog) {
        res.status(404).json({ message: 'no dog' })
        } else {
            // way 1
            // res.status(200).json({
            //     message: "success",
            //     data: dog
            // })
            // way 2
            res.status(200).json(dog)
        }
    } catch (err) {
        // if promise were to reject
        // or if another thing crashed inside the try
        // then we fall through here
        res.status(500).json({ message: err.message })
    }
  })

// [POST]   /api/dogs     (C of CRUD, create new dog from JSON payload)
server.post('/api/dogs', async (req, res) => {
    res.json('test create by endpoint') 
})
// [PUT]    /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)

// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server