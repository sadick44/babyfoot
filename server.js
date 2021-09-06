const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);



app.use(express.static(__dirname + '/public')); // orienter où recuperer les fichiers statiques

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



io.on('connection', (socket) => {
  socket.on('message',  (message)=> {
    io.sockets.emit('message', message);
    console.log('message envoyé en broadcast')
  });
});


server.listen(3000, () => {
  console.log('Serveur demarré sur *:3000');
});

