'use strict'

class Poison extends Phaser.Sprite {
    constructor(game, x, y, img) {
        super(game, x, y, img);

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.enableBody = true;
        this.body.collideWorldBounds = true;
        this.body.allowGravity = false;

        this.anchor.setTo(0.5, 0.5);

        this.delayCount = 0;
        this.delay = 60;

        this.damage = 1;

        this.velocity = 250;

        game.add.existing(this);
    }

    update() {
        if (this.alive) {
            if (this.delayCount == this.delay) {
                this.destroy();
            }
            else {
                this.angle -= 3;
                this.body.velocity.x = -this.velocity;
                this.delayCount++;
            }
        }
        else {
            this.destroy();
        }
    }
}