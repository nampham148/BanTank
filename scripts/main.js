var TankOnline = {
  map : [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ]

};

window.onload = function(){
  TankOnline.game = new Phaser.Game(window.innerWidth,
                                    window.innerHeight,
                                    Phaser.Auto,
                                    '',
                                    { preload: preload, create: create, update: update });
}
var tankA, tankB;
var wallGroup, allyGroup, enemyGroup, allyBulletGroup, enemyBulletGroup;
var preload = function(){
  TankOnline.game.load.image('tankDown', './images/tank_player1_down_c0_t1_s1.png');
  TankOnline.game.load.image('tankLeft', './images/tank_player1_left_c0_t1_s1.png');
  TankOnline.game.load.image('tankUp', './images/tank_player1_up_c0_t1_s1.png');
  TankOnline.game.load.image('tankRight', './images/tank_player1_right_c0_t1_s1.png');
  TankOnline.game.load.image('bulletDown', './images/bullet_down.png');
  TankOnline.game.load.image('bulletLeft', './images/bullet_left.png');
  TankOnline.game.load.image('bulletUp', './images/bullet_up.png');
  TankOnline.game.load.image('bulletRight', './images/bullet_right.png');
  TankOnline.game.load.image('wall', './images/wall_steel.png')
}

var create = function(){
    TankOnline.game.physics.startSystem(Phaser.Physics.ARCADE);
    TankOnline.keyboard = TankOnline.game.input.keyboard;
    enemyGroup = TankOnline.game.add.physicsGroup();
    allyGroup = TankOnline.game.add.physicsGroup();
    enemyBulletGroup = TankOnline.game.add.physicsGroup();
    allyBulletGroup = TankOnline.game.add.physicsGroup();
    tankA = new Tank(window.innerWidth/2, window.innerHeight/2, allyGroup, allyBulletGroup);
    tankB = new Tank(window.innerWidth/2 - 100, window.innerHeight/2 - 100, enemyGroup, enemyBulletGroup);
    TankOnline.game.world.setBounds(0, 0, 1500, 800);
    wallGroup = TankOnline.game.add.physicsGroup();
    TankOnline.bulletGroup = TankOnline.game.add.physicsGroup();
    for(var i=0; i<TankOnline.map.length;i++){
      for(var j=0; j<TankOnline.map[i].length;j++)
        if(TankOnline.map[i][j]) new Wall(j*16, i*16, wallGroup);
    }

}
var update = function(){
  TankOnline.game.physics.arcade.collide(allyGroup, wallGroup);
  TankOnline.game.physics.arcade.collide(enemyGroup, wallGroup);
  TankOnline.game.physics.arcade.overlap(allyBulletGroup,
                                          wallGroup,
                                          onallyBulletHitWall,
                                          null,
                                          this);
  TankOnline.game.physics.arcade.overlap(enemyBulletGroup,
                                        wallGroup,
                                        onenemyBulletHitWall,
                                        null,
                                        this);
  TankOnline.game.physics.arcade.overlap(allyBulletGroup,
                                          enemyGroup,
                                          onBulletHitEnemy,
                                          null,
                                          this);
  TankOnline.game.physics.arcade.overlap(enemyBulletGroup,
                                        allyGroup,
                                        onBulletHitAlly,
                                        null,
                                        this);

  var directionA = new Phaser.Point();
  if(TankOnline.keyboard.isDown(Phaser.KeyCode.LEFT)) directionA.x = -1;
  else if (TankOnline.keyboard.isDown(Phaser.KeyCode.RIGHT)) directionA.x = 1;
  else directionA.x = 0;

  if(TankOnline.keyboard.isDown(Phaser.KeyCode.UP)) directionA.y = -1;
  else if (TankOnline.keyboard.isDown(Phaser.KeyCode.DOWN)) directionA.y = 1;
  else directionA.y = 0;

  var directionB = new Phaser.Point();
  if(TankOnline.keyboard.isDown(Phaser.KeyCode.A)) directionB.x = -1;
  else if (TankOnline.keyboard.isDown(Phaser.KeyCode.D)) directionB.x = 1;
  else directionB.x = 0;

  if(TankOnline.keyboard.isDown(Phaser.KeyCode.W)) directionB.y = -1;
  else if (TankOnline.keyboard.isDown(Phaser.KeyCode.S)) directionB.y = 1;
  else directionB.y = 0;

  tankA.update(directionA);
  tankB.update(directionB);

  if(TankOnline.keyboard.isDown(Phaser.KeyCode.SPACEBAR)){
    tankB.fire();
  }
  if(TankOnline.keyboard.isDown(Phaser.KeyCode.SHIFT)){
    tankA.fire();
  }
}

var onallyBulletHitWall = function(allyBulletSprite, wallSprite){
  allyBulletSprite.kill();
}
var onenemyBulletHitWall = function(enemyBulletSprite, wallSprite){
  enemyBulletSprite.kill();
}
var onBulletHitEnemy = function(allyBulletSprite, enemySprite){
  enemySprite.damage(allyBulletSprite.bulletDamage);
  allyBulletSprite.kill();
}
var onBulletHitAlly = function(enemyBulletSprite, allySprite){
  allySprite.damage(enemyBulletSprite.bulletDamage);
  enemyBulletSprite.kill();
}
