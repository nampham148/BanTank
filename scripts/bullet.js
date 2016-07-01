class Bullet{
  constructor(tank){
    var spriteName;
    if (tank.sprite.direction.x > 0){
      spriteName = 'bulletRight';
    }
    else if (tank.sprite.direction.x < 0) {
      spriteName = 'bulletLeft';
    }
    else if (tank.sprite.direction.y > 0) {
      spriteName = 'bulletDown';
    }
    else if (tank.sprite.direction.y < 0) {
      spriteName = 'bulletDown';
    }
    this.sprite = tank.sprite.BulletGroup.create(tank.sprite.x, tank.sprite.y, spriteName);
    this.sprite.anchor.set(0.5 , 0.5);
    this.sprite.body.velocity = new Phaser.Point(tank.sprite.direction.x * 500, tank.sprite.direction.y * 500);
    this.sprite.bulletDamage = 1;
  }
}
