'use strict'

class PlantMonster extends Phaser.Sprite {
    constructor(game, x, y, img, shotImg) {
        super(game, x, y, img);

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.enableBody = true;
        //this.body.allowGravity = false;
        this.body.collideWorldBounds = true;

        this.animations.add('plantAnimation', [0, 1], 8, true);
        this.animations.play('plantAnimation');

        this.game = game;

        this.damage = 1;

        this.shotCount = 60;
        this.shotDelay = 150;

        this.poisons = game.add.group();

    }

    shootPoison(){
        var poison = new Poison(this.game, this.x, this.y+33, 'poison');
        this.poisons.add(poison);
        this.shotCount = 0;
    }

    update() {
        if(this.alive){
            if (this.shotCount == this.shotDelay) {
                this.shootPoison();
            }else{
                this.shotCount++;
            }
        }
        else{
            this.destroy();
        }
    }
}