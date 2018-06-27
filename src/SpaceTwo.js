class SpaceTwo extends Phaser.Sprite {
    constructor(game, x, y, img) {
        super(game, x, y, img);

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.enableBody = true;
        this.body.allowGravity = false;

        this.anchor.setTo(0.5, 0.5);

        this.damage = 4;
        this.velocity = 2;

        this.count = 0;
        this.moveDelay = 280;
    }
    turnSprite() {
        this.scale.x *= -1;
    }

    walkRight() {
        this.body.velocity.x += this.velocity;
    }

    walkLeft() {
        this.body.velocity.x -= this.velocity;
    }

    update() {
        //console.log(this.count)
        if (this.count < (this.moveDelay / 2)) {
            this.walkRight();
            this.count++;
        } else if (this.count == (this.moveDelay / 2)) {
            this.turnSprite();
            this.body.velocity.x = 0;
            this.count++;
        } else if (this.count > (this.moveDelay / 2) && this.count < this.moveDelay) {
            this.walkLeft();
            this.count++;
        } else {
            this.count = 0;
            this.turnSprite();
            this.body.velocity.x = 0;
        }
    }
}