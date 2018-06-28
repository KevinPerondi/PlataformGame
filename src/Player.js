'use strict'

class Player extends Phaser.Sprite {
    constructor(game, x, y, img, keys, score) {
        super(game, x, y, img)

        this.score = score;
        this.health = 20;

        this.damageDelay = 60;
        this.damageDelayCount = 60;

        this.anchor.setTo(0.5, 0.5)
        this.scale.setTo(0.2, 0.2)

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;

        this.velocity = 200;
        this.jumpTimer = 0;

        this.getKey = false;

        this.facing = "right";

        this.animations.add('right', [0, 1, 2, 3, 4, 5], 8, true);
        this.animations.add('left', [11, 10, 9, 8, 7, 6], 8, true);

        this.fireCount = 80;
        this.fireDelay = 80;

        this.scythes = game.add.group();

        this.cursors = {
            left: game.input.keyboard.addKey(keys.left),
            right: game.input.keyboard.addKey(keys.right),
            jump: game.input.keyboard.addKey(keys.jump)
        }
    }

    shootScythe() {
        if (this.fireCount == this.fireDelay) {
            var scythe = new Scythe(this.game, this.x, this.y, 'shot', this.facing);
            this.scythes.add(scythe);
            this.fireCount = 0;
        }
    }

    jump() {
        if (this.body.onFloor()) {
            this.body.velocity.y = -460;
        }
    }

    moveAndTurn() {
        if (!this.alive) {
            return
        } else {
            this.body.velocity.x = 0;
            if (this.cursors.left.isDown) {
                this.body.velocity.x = -this.velocity;
                this.animations.play('left');
                this.facing = "left";
            }
            else if (this.cursors.right.isDown) {
                this.body.velocity.x = this.velocity;
                this.animations.play('right');
                this.facing = "right";
            } else {
                this.animations.stop()
            }
        }
    }

    update() {
        if (this.health <= 0) {
            this.kill();
        }

        if (this.alive) {
            this.moveAndTurn();
            if (this.fireCount < this.fireDelay) {
                this.fireCount++;
            }
        } else {
            this.destroy();
        }
    }
}
