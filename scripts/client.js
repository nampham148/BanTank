class Client{
  constructor(){
    this.socket = io();
    this.socket.on('connected', function(msg){
      console.log(msg);
      var newtank = new Tank(msg.x * TankOnline.game.width, msg.y*TankOnline.game.height, TankOnline.tankGroup);
    });
  }
}
