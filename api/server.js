// IMPORTS AT THE TOP
const express = require('express')

const Dog = require('./dog-model')
// INSTANCE OF EXPRESS APP
const server = express()
// GLOBAL MIDDLEWARE




server.use(express.json())
// ENDPOINTS

// [GET]    /             (Hello World endpoint)
server.get('/', (req, res)=>{
  console.log('received get request!')
  res.json("hello world")
})
// [GET]    /api/dogs     (R of CRUD, fetch all dogs)
server.get('/api/dogs', (req, res)=>{
  // res.json({message: "get all dogs"})

  Dog.findAll()
    .then( dogs =>{
      res.status(200).json(dogs)
    })
    .catch( err=>{
      res.status(500).json({
        massage: err.massage,
        err: err.massage,
        stack: err.stack
      })
    })
})
// [GET]    /api/dogs/:id (R of CRUD, fetch dog by :id)
server.get('/api/dogs/:id', (req, res)=>{
  // res.json({message: 'get a dog by id'})
  Dog.findById(req.params.id)
    .then( dog =>{
      // if(dog == null){
      //   console.log("dog -->", dog)
      //   res.status(404).json({message: `dog ${id} not found!`})
      // }else{
      //   res.status(200).json(dog)
      // }
      // console.log(dog == null);
      console.log(!dog);
      // if(dog == null) {
      if(!dog) {
        // console.log("test")
        res.status(404).json( `dog ${req.params.id} not found!` );
      } else {
          res.json(dog);
      }
    })
    .catch( err=>{
      res.status(500).json({ message: `could not get dog!` });
      // res.status(500).json({
      //   massage: err.message,
      //   err: err.message,
      //   stack: err.stack
      // })
    })
})
// [POST]   /api/dogs     (C of CRUD, create new dog from JSON payload)
server.post('/api/dogs', (req, res)=>{
  // res.json("post the new dog")
  const { name, weight } = req.body
  if(!name || !weight){
    res.status(404).json({message: "Please provide name and weight for the dog"})
  }else{
    Dog.create({ name, weight })
    .then( newDog => {
      res.status(201).json(newDog)
    })
    .catch( err=>{
      res.status(500).json({
        message: err.message,
        eer: err.message,
        stack: err.stack
      })
    })
  }
})
// [PUT]    /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
server.put('/api/dogs/:id', async (req, res)=>{
  // res.json("put update the dog by id")

  let { id } = req.params

  try{
    const passibleDog =await Dog.findById(id)
    if(!passibleDog){
      res.status(404).json({massage: " the user with the specified ID does not exist"})
    }else if(!req.body.name || !req.body.weight){
      res.status(400).json({message: "Please provide name and weight for the dog" })
    }else{
      let dog = await Dog.update(id, req.body)
      res.status(200).json(dog)
    }
  }catch(err){
    res.status(500).json({
      message: err.message,
      err: err.message,
      stack: stack.message
    })
  }

})

// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)

server.delete('/api/dogs/:id', async (req, res)=>{
  // res.json({message: "delete the dog by id"})
  Dog.delete(req.params.id)
    .then( dog => {
      if(!dog){
        res.status(404).json({message: `dog ${id} no found`})
      }
      res.status(200).json(dog)
    })
    .catch( err=>{
      res.status(500).json({
        message: err.massage,
        err: err.massage,
        stack: err.stack
      })
    })

})

// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server