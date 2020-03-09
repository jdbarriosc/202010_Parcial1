let socket_io = require("socket.io");
var io = socket_io();
var socketApi = {};


socketApi.io = io;

const ofers = [];

let receivingOffers = true;

io.on('connection', function(socket) {

  io.sockets.emit('update-ofers', {ofers: ofers, receivingOffers: receivingOffers} );

  socket.on('new-ofer', function(oferer) {
      let value = 0;
      if (ofers.length === 0) {
        value = 150000000;
      } else {
        value = Math.floor(ofers[ofers.length-1].value + 5000000 + Math.random()*5000000);
      }

      const PB = Math.random()*0.5 + 0.3;
      const PO = Math.random()*0.5 + 0.3;

      const accepted = PO > PB;

      const newOfer = { razonsocial: oferer.razonsocial, value: value, accepted: accepted };
      ofers.push(newOfer);
      console.log(newOfer);
      if(accepted){
        receivingOffers = false;
      }

      io.sockets.emit('update-ofers', {ofers: ofers, receivingOffers: receivingOffers});

  });
});


module.exports = socketApi;