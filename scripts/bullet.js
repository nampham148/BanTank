class Bullet{
  constructor(x, y){
    this.sprite = TankOnline.game.add.sprite(x, y, 'bulletDown');
    TankOnline.game.physics.arcade.enable(this.sprite);
  }

  update(z){
    if (z == 2){
      this.sprite.loadTexture('bulletRight');
      this.sprite.body.velocity.x = 300;
    }
    else if (z == 1){
      this.sprite.loadTexture('bulletLeft');
      this.sprite.body.velocity.x = -300;
    }
    else if (z == 3){
      this.sprite.loadTexture('bulletUp');
      this.sprite.body.velocity.y = -300;
    }
    else{
      this.sprite.loadTexture('bulletDown');
      this.sprite.body.velocity.y = 300;
    }
  }
}
