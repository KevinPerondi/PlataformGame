'use strict'

class Boss extends Phaser.Sprite {
    constructor(game, x, y, img) {
        super(game, x, y, img);

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.enableBody = true;
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;

        //this.anchor.setTo(0.5, 0.5);

        this.health = 10;

        this.animations.add('moveBoss', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        this.animations.play('moveBoss');

        this.shots = game.add.group();

        this.countDelay = 0;
        this.delay = 50;
    }

    bossShot(){
        var shotNorth = new BossShot (this.game, this.x, this.y,'bossShot','north');
        this.shots.add(shotNorth);
        var shotSouth = new BossShot (this.game, this.x, this.y,'bossShot','south');
        this.shots.add(shotSouth);
        var shotEast = new BossShot (this.game, this.x, this.y,'bossShot','east');
        this.shots.add(shotEast);
        var shotWest = new BossShot (this.game, this.x, this.y,'bossShot','west');
        this.shots.add(shotWest);
    }

    update() {
        if(this.health <= 0){
            this.kill();
        }

        if (this.alive) {
            if(this.countDelay == this.delay){
                this.bossShot();
                this.countDelay = 0;
            }else{
                this.countDelay++;
            }
        }
        else {
            this.destroy();
        }
    }
}