'use strict'

class Scythe extends Phaser.Sprite {
    constructor(game, x, y, img, facing) {
        super(game, x, y, img);

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.enableBody = true;
        this.body.collideWorldBounds = true;
        this.body.allowGravity = false;

        this.anchor.setTo(0.5, 0.5)
        this.scale.setTo(0.2, 0.2)

        this.delayCount = 0;
        this.delay = 80;

        this.velocity = 300;

        this.facing = facing;

        this.animations.add('turnScythe', [0, 1, 2, 3], 20, true);
        this.animations.play('turnScythe');

        this.scytheSound = game.add.audio('scytheSound');
        this.scytheSound.volume -= 0.8;
        this.scytheSound.play();
        game.add.existing(this);
    }


    update() {
        if (this.alive) {
            /*if (this.delayCount == 0) {
                this.scytheSound.play();
            }*/
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
        else {
            this.scytheSound.stop();
            this.destroy();
        }
    }
}