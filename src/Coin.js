'use strict'

class Coin extends Phaser.Sprite {
    constructor(game, x, y, img) {
        super(game, x, y, img);

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.enableBody = true;
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;

        //this.anchor.setTo(0.5,0.5);
        this.score = 1;

        this.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        this.animations.play('spin');
    }


    update(){
        if(!this.alive){
            this.destroy();
        }
    }

}