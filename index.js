var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname));


app.get('/', function(req, res){
  res.sendFile(__dirname + 'index.html');
});

var players = [];
var getPlayerById = function(id){
  for(var i=0;i<players.length;i++){
    if(players[i].id == id){
      return players[i];
    }
  }
}

io.on('connection', function(socket){
  console.log('New User Connected');

  // Send all players' data to the new player
  socket.emit('other_players', players);

  var newPlayerInfo = {
    id  : socket.id,
    x   : Math.random()*3200,
    y   : Math.random()*800
  }
  // Tell the new player where to initiate his tank
  socket.emit('connected', newPlayerInfo);
  // Tell all other players where to initiate new player's tank
  socket.broadcast.emit('new_player_connected', newPlayerInfo);
  // Add new player's info to the array of all players
  players.push(newPlayerInfo);

  socket.on('tank_moved', function(data){
    var playerInfo = getPlayerById(data.id);
    playerInfo.x = data.position.x;
    playerInfo.y = data.position.y;
    socket.broadcast.emit('player_moved', data);
  });

  socket.on('tank_fired', function(data){
    socket.broadcast.emit('player_fired', data);
  });

  socket.on('tank_dead', function(data){
    var playerInfo = getPlayerById(data.id);
    var xyz = players.indexOf(playerInfo);
    if (xyz > -1) {
      players.splice(xyz, 1);
    }
  });
});

http.listen(6969, function(){
  console.log('Server started. Listening on *:6969');
});
