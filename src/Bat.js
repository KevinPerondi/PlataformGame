'use strict'

class Bat extends Phaser.Sprite {
    constructor(game, x, y, img) {
        super(game, x, y, img);

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.enableBody = true;
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;

        this.anchor.setTo(0.5, 0.5);
        
        //ver scala com o professor
        //this.scale.setTo(1.5,1.5);

        this.damage = 1;

        this.animations.add('wings', [1, 0, 2], 10, true);
        this.animations.play('wings')
    }


    update(){
        if(!this.alive){
            this.destroy();
        }
    }

}