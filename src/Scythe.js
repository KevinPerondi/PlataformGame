class Scythe extends Phaser.Sprite {
    constructor(game, x, y, img, facing) {
        super(game, x, y, img);
        this.delayCount = 0;
        this.delay = 120;

        this.velocity = 200;

        this.facing = facing;

        this.anchor.setTo(0.5, 0.5)
        this.scale.setTo(0.2, 0.2)

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;
        this.body.allowGravity = false;

        this.animations.add('turnScythe', [0, 1, 2, 3], 20, true);
    }


    update() {
        if (this.delayCount == this.delay) {
            this.destroy();
        }
        else {
            if (this.facing == "right") {
                this.body.velocity.x = +this.velocity;
            }
            else if (this.facing == "left") {
                this.body.velocity.x = -this.velocity;
            }
            this.delayCount++;
        }
    }
}