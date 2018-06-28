'use strict'

class Door extends Phaser.Sprite {
    constructor(game, x, y, img) {
        super(game, x, y, img);

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.enableBody = true;
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;

        //this.anchor.setTo(0.5,0.5);

        this.animations.add('closed',[0],0,true);
        this.animations.add('opened',[1],0,true);

        this.animations.play('closed');
    }

    changeDoorStatus(){
        this.animations.stop('closed');
        this.animations.play('opened');
    }

}