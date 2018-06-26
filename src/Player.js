
class Player extends Phaser.Sprite {
    constructor(game, x, y, img, keys) {
        super(game, x, y, img)

        this.score = 0;
        this.health = 5;

        this.damageDelay = 60;
        this.damageDelayCount = 60;

        this.anchor.setTo(0.5, 0.5)
        this.scale.setTo(0.2, 0.2)

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;

        this.velocity = 200;
        this.jumpTimer = 0;

        this.getKey = false;

        this.animations.add('right', [0, 1, 2, 3, 4, 5], 8, true);
        this.animations.add('left', [11, 10, 9, 8, 7, 6], 8, true);


        //this.body.drag.set(config.PLAYER_DRAG)
        //this.body.mass = 0.1
        //this.body.friction.setTo(0, 0)
        //this.body.bounce.setTo(1,1)
        //this.body.isCircle = true
        //this.body.allowRotation = false

        this.cursors = {
            left: game.input.keyboard.addKey(keys.left),
            right: game.input.keyboard.addKey(keys.right),
            jump: game.input.keyboard.addKey(keys.jump)
        }

        // particulas de fumaça
        /*this.emitter = game.add.emitter(0, 0, 40);
        this.emitter.makeParticles(['smoke']);
        this.emitter.setXSpeed(0, 0)
        this.emitter.setYSpeed(0, 0)
        this.emitter.setAlpha(1, 0, 1000);
        this.emitter.setScale(0.7, 0, 0.7, 0, 1000);
        this.emitter.start(false, 1000, 50);*/
    }

    /*angleByAtan() {
        if ((this.body.velocity.x != 0) || (this.body.velocity.y != 0)) {
            this.angle =
                Math.atan2(this.body.velocity.y, this.body.velocity.x) * 180 / Math.PI
        }
    }*/

    jump() {
        if (this.body.onFloor()) {
            this.body.velocity.y = -250;
        }
    }

    // move e rotaciona, como em Asteroids
    moveAndTurn() {
        if (!this.alive) {
            return
        } else {
            this.body.velocity.x = 0;
            if (this.cursors.left.isDown) {
                this.body.velocity.x = -this.velocity;
                this.animations.play('left');
            }
            else if (this.cursors.right.isDown) {
                this.body.velocity.x = this.velocity;
                this.animations.play('right');
            }else{
                this.animations.stop()
            }
        }


        //  mouse ou touch
        /*if (this.game.input.mousePointer.isDown || this.game.input.pointer1.isDown) {
            let x = this.game.input.mousePointer.x + this.game.input.pointer1.x
            let y = this.game.input.mousePointer.y + this.game.input.pointer1.y

            if (!Phaser.Rectangle.contains(this.body, this.game.input.x, this.game.input.y)) {
                //this.game.physics.arcade.moveToPointer(this, config.PLAYER_MAX_VELOCITY);
                this.rotation = this.game.physics.arcade.moveToPointer(this, 60,
                    this.game.input.activePointer, config.PLAYER_MAX_VELOCITY);
            }
        }*/
        //this.angleByAtan()
    }


    /* fireBullet() {
         if (!this.alive)
             return;
     
         if (this.cursors.fire.isDown) {
             if (this.game.time.time > this.nextFire) {
                 var bullet = this.bullets.getFirstExists(false)
                 if (bullet) {
                     bullet.reset(this.x, this.y)
                     bullet.lifespan = config.BULLET_LIFE_SPAN
                     bullet.rotation = this.rotation
                     bullet.body.bounce.setTo(1,1)
                     bullet.body.friction.setTo(0,0)
                     this.game.physics.arcade.velocityFromRotation(
                         bullet.rotation + this.game.rnd.realInRange(-config.BULLET_ANGLE_ERROR, config.BULLET_ANGLE_ERROR), 
                         config.BULLET_VELOCITY, bullet.body.velocity
                     )
                     // fire rate
                     this.nextFire = this.game.time.time + config.BULLET_FIRE_RATE
                 }
             }
         }    
     } */

    update() {
        if (this.alive) {
            this.moveAndTurn();
            //this.fireBullet()
            //this.emitter.emitParticle()

            /*this.emitter.emitX = this.x;
            this.emitter.emitY = this.y;*/
        } else {
            this.destroy();
        }
    }
}
