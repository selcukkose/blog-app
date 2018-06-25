const hapi = require('hapi');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogs');
const db = mongoose.connection;
db.on('open', ()=>{
    console.log("Connected to MongoDB");
})
db.on('close', (err)=>{
    console.log(err);
});

const server = new hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
        cors: true
    }
});



const start = async ()=> {

    await server.register(require('./plugins/login'));
    await server.register(require('./plugins/blogs'));
    await server.register(require('./plugins/requestHandlers/blogRequestHandler'));
    await server.register(require('./plugins/requestHandlers/loginRequestHandler'));

    await server.start();
    console.log("Server running...");
}

process.on('uncaughtException', (err)=>{

    console.log(err);
    process.exit(1);
})

start();