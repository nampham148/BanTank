var TankOnline = {};

window.onload = function(){
  TankOnline.game = new Phaser.Game(window.innerWidth,
                                    window.innerHeight,
                                    Phaser.Auto,
                                    '',
                                    { preload: preload, create: create, update: update });
}
var tank;
var direction;
var preload = function(){
  TankOnline.game.load.image('tankDown', './images/tank_player1_down_c0_t1_s1.png');
  TankOnline.game.load.image('tankLeft', './images/tank_player1_left_c0_t1_s1.png');
  TankOnline.game.load.image('tankUp', './images/tank_player1_up_c0_t1_s1.png');
  TankOnline.game.load.image('tankRight', './images/tank_player1_right_c0_t1_s1.png');
  TankOnline.game.load.image('bulletDown', './images/bullet_down.png');
  TankOnline.game.load.image('bulletLeft', './images/bullet_left.png');
  TankOnline.game.load.image('bulletUp', './images/bullet_up.png');
  TankOnline.game.load.image('bulletRight', './images/bullet_right.png')
}

var create = function(){
    TankOnline.game.physics.startSystem(Phaser.Physics.ARCADE);
    TankOnline.keyboard = TankOnline.game.input.keyboard;
    tank = new Tank(window.innerWidth/2, window.innerHeight/2);

}
var update = function(){
  var direction = new Phaser.Point();
  if(TankOnline.keyboard.isDown(Phaser.KeyCode.LEFT)){
    direction.x = -1;
  }
  else if (TankOnline.keyboard.isDown(Phaser.KeyCode.RIGHT)){
    direction.x = 1;
  }
  else direction.x = 0;

  if(TankOnline.keyboard.isDown(Phaser.KeyCode.UP)){
    direction.y = -1;
  }
  else if (TankOnline.keyboard.isDown(Phaser.KeyCode.DOWN)) {
    direction.y = 1;
  }
  else direction.y = 0;

  tank.update(direction);

  if(TankOnline.keyboard.isDown(Phaser.KeyCode.SPACEBAR)){
    tank.fire();
  }
}
