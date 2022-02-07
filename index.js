// import the server and start it!
const server = require('./api/server')

console.log('hello world')
const port = 9000
server.listen(port, ()=>{
    console.log('server start ', port)
})