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
  if(TankOnline.keyboard.isDown(Phaser.KeyCode.LEFT)){
    directionX = -1;
    direction = 1;

  }
  else if (TankOnline.keyboard.isDown(Phaser.KeyCode.RIGHT)){
    directionX = 1;
    direction = 2
  }
  else directionX = 0;

  if(TankOnline.keyboard.isDown(Phaser.KeyCode.UP)){
    directionY = -1;
    direction = 3
  }
  else if (TankOnline.keyboard.isDown(Phaser.KeyCode.DOWN)) {
    directionY = 1;
    direction = 4;
  }
  else directionY = 0;

  tank.update(directionX, directionY);

  if(TankOnline.keyboard.isDown(Phaser.KeyCode.SPACEBAR)){
    var bullet;
    bullet = new Bullet(window.innerWidth/2, window.innerHeight/2);
    bullet.update(direction);
  }
}
