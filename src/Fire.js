'use strict'

class Fire extends Phaser.Sprite {
    constructor(game, x, y, img) {
        super(game, x, y, img);

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.enableBody = true;
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;

        this.anchor.setTo(0.5, 0.5);

        this.damage = 4;

        this.animations.add('fireOn', [0, 1, 2], 8, true);
        this.animations.play('fireOn');

    }

    reduceDamage() {
        if (this.damage == 0) {
            this.destroy();
        } else {
            this.damage--;
        }
    }

}