'use strict'

class BossShot extends Phaser.Sprite {
    constructor(game, x, y, img, type) {
        super(game, x, y, img);

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.enableBody = true;
        this.body.collideWorldBounds = true;
        this.body.allowGravity = false;

        this.anchor.setTo(0.5, 0.5);

        this.delayCount = 0;
        this.delay = 120;

        this.damage = 10;

        this.velocity = 250;

        this.type = type;

        if (this.type == "north") {
            this.animations.add('shotAnimation', [4, 5, 6, 7], 10, true);
        } else if (this.type == "south") {
            this.animations.add('shotAnimation', [0, 1, 2, 3], 10, true);
        } else if (this.type == "east") {
            this.animations.add('shotAnimation', [8, 9, 10, 11], 10, true);
        } else if (this.type == "west") {
            this.animations.add('shotAnimation', [12, 13, 14, 15], 10, true);
        }
        this.animations.play('shotAnimation');
        game.add.existing(this);
    }

    update() {
        if (this.alive) {
            if (this.delayCount == this.delay) {
                this.destroy();
            }
            else {
                if (this.type == "north") {
                    this.body.velocity.y = -this.velocity;
                } else if (this.type == "south") {
                    this.body.velocity.y = +this.velocity;
                } else if (this.type == "east") {
                    this.body.velocity.x = +this.velocity;
                } else if (this.type == "west") {
                    this.body.velocity.x = -this.velocity;
                }
                this.delayCount++;
            }
        }
        else {
            this.destroy();
        }
    }
}