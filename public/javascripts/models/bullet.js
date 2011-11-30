
  window.Bullet = (function() {

    function Bullet(owner, p5) {
      this.owner = owner;
      this.p5 = p5;
      this.x = this.owner.x;
      this.y = this.owner.y;
      this.angle = this.owner.angle;
    }

    Bullet.prototype.draw = function() {
      this.p5.fill(0);
      return this.p5.ellipse(this.x, this.y, 2, 2);
    };

    return Bullet;

  })();
