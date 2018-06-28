'use strict'

class GoldBag extends Phaser.Sprite {
    constructor(game, x, y, img) {
        super(game, x, y, img);

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.enableBody = true;
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;

        //this.anchor.setTo(0.5,0.5);
        this.score = 50;

        this.bagSound = game.add.audio('goldBagSound');

    }

    update(){
        if(!this.alive){
            this.bagSound.play();
            this.destroy();
        }
    }

}