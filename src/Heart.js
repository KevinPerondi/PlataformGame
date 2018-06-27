'use strict'

class Heart extends Phaser.Sprite {
    constructor(game, x, y, img) {
        super(game, x, y, img);

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.enableBody = true;
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;

        this.healthValue = 5;

        this.delayCount = 0;
        this.delay = 60;
    }

    increaseScale() {
        this.scale.setTo(this.scale.x+(this.scale.x*0.005), this.scale.y+(this.scale.y*0.005));
    }

    decreaseScale() {
        this.scale.setTo(this.scale.x-(this.scale.x*0.005), this.scale.y-(this.scale.y*0.005));
    }

    update() {
        if (this.alive) {
            if (this.delayCount == this.delay){
                this.delayCount = 0;
            }
            else if (this.delayCount < (this.delay/2)){
                this.increaseScale();
            }
            else if (this.delayCount > (this.delay/2)){
                this.decreaseScale();
            }
            this.delayCount++;
        }
        else {
            this.destroy();
        }
    }
}