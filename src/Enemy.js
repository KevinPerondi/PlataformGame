'use strict'

class Enemy extends Phaser.Sprite{
    constructor(game, x, y, img){
        super(game,x,y,img);
        this.walkDelay = 120;
        this.walkCount = 0;
        this.limitX = false;
        this.velocity = 200;
        this.anchor.setTo(0.5,0.5);
        this.scale.setTo(0.5,0.5);
    }


    moveEnemy(){
        if (this.limitX){
            if(this.walkCount >= this.walkDelay){
                this.body.velocity.x = this.velocity 
                this.walkCount++;
            }
            else{
                this.limitX = true;
            }
        }else{

        }
    }

    update(){

        this.moveEnemy()
    }
}