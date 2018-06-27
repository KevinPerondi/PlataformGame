'use strict'

class GroundMonster extends Phaser.Sprite {
    constructor(game, x, y, img) {
        super(game, x, y, img);

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;

        this.damage = 3;

        this.count = 0;
        this.moveDelay = 120;

        this.anchor.setTo(0.5,0.5);

        this.velocity = 3;

        this.animations.add('walkRight', [0, 1], 8, true);
        this.animations.add('walkLeft', [2,3], 8, true);
        this.animations.play('walkLeft');

        this.facing = 'right';
    }

    turnSprite() {
        if(this.facing == 'right'){
            this.animations.play('walkRight');
            this.facing = 'left';
        }else if (this.facing == 'left'){
            this.animations.play('walkLeft');
            this.facing = 'right';
        }
    }

    walkRight() {
        this.body.velocity.x += this.velocity;
    }

    walkLeft() {
        this.body.velocity.x -= this.velocity;
    }

    update() {
        if (!this.alive) {
            this.destroy();
        } else {
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

}