
class Tank{
  constructor(x, y){
    this.sprite = TankOnline.game.add.sprite(x, y, 'tankDown');
    TankOnline.game.physics.arcade.enable(this.sprite);
    this.sprite.anchor.set(0.5,0.5);
    this.sprite.direction = new Phaser.Point(0,1);
  }

  update(direction){
    if(direction.x < 0){
      this.sprite.loadTexture('tankLeft');
      this.sprite.body.velocity.x = -150;
      tank.direction = new Phaser.Point(-1,0);
    }
    else if (direction.x > 0){
      this.sprite.body.velocity.x = 150;
      this.sprite.loadTexture('tankRight');
      tank.direction = new Phaser.Point(1,0);
    }
    else{
      this.sprite.body.velocity.x = 0;
    }

    if(direction.y < 0){
      this.sprite.body.velocity.y = -150;
      this.sprite.loadTexture('tankUp');
      tank.direction = new Phaser.Point(0,-1);
    }
    else if (direction.y > 0){
      this.sprite.body.velocity.y = 150;
      this.sprite.loadTexture('tankDown');
      tank.direction = new Phaser.Point(0,1);
    }
    else{
      this.sprite.body.velocity.y = 0;
    }
  }
  fire(){
    new Bullet(this);
  }
}
