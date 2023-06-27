const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('Novo cliente conectado', { id: socket.id });
  socket.on('message', (data) => {
    console.log('message', data);
    const { message, encryptionType, userId } = data;
    io.emit('message', { message, encryptionType, userId });
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
