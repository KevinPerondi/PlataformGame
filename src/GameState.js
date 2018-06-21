'use strict'

class GameState extends BaseState {

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        this.game.physics.arcade.gravity.y = 100;

        let skyWidth = this.game.cache.getImage('background1').width
        let skyHeight = this.game.cache.getImage('background1').height
        this.sky = this.game.add.tileSprite(
            0, 0, skyWidth, skyHeight, 'background1')
        this.sky.scale.x = this.game.width / this.sky.width
        this.sky.scale.y = this.game.height / this.sky.height
        this.sky.fixedToCamera = true

        this.rain = this.game.add.tileSprite(
            0, 0, this.game.width, this.game.height, 'rain')
        this.rain.tileScale.setTo(7, 7)
        this.rain.alpha = 0.4
        this.rain.fixedToCamera = true

        this.createTileMap()

        let vpad = new VirtualGamepad(this.game)
        this.game.add.existing(vpad)

        let jumpButton = vpad.addActionButton(
            this.game.width-100, this.game.height-100, 'vstick_button',
            () => this.player1.jump())
        
        let dpadButton = vpad.addDPadButton(
            155, this.game.height-100, 'vstick_dpad', {
                leftPressed:  () => this.player1.cursors.left.isDown  = true,
                leftReleased: () => this.player1.cursors.left.isDown  = false,
                rightPressed: () => this.player1.cursors.right.isDown = true,
                rightReleased:() => this.player1.cursors.right.isDown = false
            })

        this.player1 = new Player(this.game, 100, 100,
            'plane1',{
                left: Phaser.Keyboard.LEFT,
                right: Phaser.Keyboard.RIGHT,
                up: Phaser.Keyboard.UP,
                down: Phaser.Keyboard.DOWN,
                fire: Phaser.Keyboard.UP//L
            })

        this.game.add.existing(this.player1)
        this.game.camera.follow(this.player1, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1); // smooth        

        this.hud = {
            text1: this.createText(this.game.width * 1 / 9, 50, 'PLAYER 1: 20'),
            text2: this.createText(this.game.width * 8 / 9, 50, 'PLAYER 2: 20')
            //fps: createHealthText(game.width*6/9, 50, 'FPS'),
        }
        this.updateHud()

        let fps = new FramesPerSecond(this.game, this.game.width / 2, 50)
        this.game.add.existing(fps)

        let fullScreenButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE)
        fullScreenButton.onDown.add(this.toggleFullScreen, this)

        //game.time.advancedTiming = true;
        this.initFullScreenButtons()
    
    }

    loadFile() {
        let text = this.game.cache.getText('map1');
        return text.split('\n');
    }

    createTileMap() {
        // TODO implementar leitura do arquivo de tilemap e objetos

        this.map = this.game.add.tilemap('fase1');
        this.map.addTilesetImage('groundTiles');
        this.map.addTilesetImage('background');
        this.map.addTilesetImage('coin');

        this.mapLayer = this.map.createLayer('Background Layer');
        this.mapLayer = this.map.createLayer('Tiles Layer 1');
        this.map.setCollisionBetween(0,17,true,'Tiles Layer 1');
        //this.map.setCollisionBetween(0,true,'Tiles Layer 1')

        this.coins = this.game.add.group();
        this.coins.enableBody = true;

        this.map.createFromObjects('Object Layer', 51, 'coin', 0, true, true, this.coins);

        this.coins.forEach(function(coin){
            coin.animations.add('spin', [0, 1, 2, 3, 4, 5], 10, true);
            coin.animations.play('spin');
            coin.body.allowGravity = false;
        })

        this.mapLayer.resizeWorld();

        /*this.map = this.game.add.tilemap('level2')
        this.map.addTilesetImage('tiles1')

        this.mapLayer = this.map.createLayer('Tiles Layer 1')
        this.map.setCollisionBetween(1, 11, true, 'Tiles Layer 1')
        this.map.setTileIndexCallback(29, this.hitSpikes, this)

        this.obstacles = this.game.add.group()
        this.map.createFromObjects('Object Layer 1', 45, 'saw', 0, true, true, this.obstacles, Saw)

        this.mapLayer.resizeWorld()*/
    }


    toggleFullScreen() {
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL
        if (this.game.scale.isFullScreen) {
            this.game.scale.stopFullScreen()
        } else {
            this.game.scale.startFullScreen(false)
        }
    }

    update() {
        //    hud.fps.text = `FPS ${game.time.fps}`
        this.rain.tilePosition.x += 0.3

        //moveAndStop(player1)
        //this.updateBullets(this.player1.bullets)

        // colisoes com mapa
        this.game.physics.arcade.collide(this.player1, this.mapLayer);

        // colisao com serras
        this.game.physics.arcade.collide(this.player1, this.obstacles, this.hitObstacle, null, this)
    }

    killBullet(bullet, wall) {
        //wall.kill()
        bullet.kill()
        this.createExplosion(bullet.x, bullet.y)
    }

    hitObstacle(player, obstacle) {
        if (player.alive) {
            player.damage(1)
            if (!player.alive)
                this.game.camera.follow(null)
            
            this.updateHud()
            this.game.camera.shake(0.01, 200);

            // empurra jogador na direcao oposta a da colisao
            let forceDirection = this.game.physics.arcade.angleBetween(obstacle, player)
            this.game.physics.arcade.velocityFromRotation(forceDirection, 600, player.body.velocity)
        }
    }



    updateHud() {
        this.hud.text1.text = `PLAYER 1: ${this.player1.health}`
    }

    render() {
        //obstacles.forEach(function(obj) { game.debug.body(obj) })
        this.game.debug.body(this.player1)
        //game.debug.body(player2)
    }




    /*hitSpikes(sprite, tile) {
        sprite.alpha = 0.5
        tile.alpha = 0
        // força atualizaçao dos tiles no map
        this.mapLayer.dirty = true 
    }

    hitPlayer(player, bullet) {
        if (player.alive) {
            player.damage(1)
            bullet.kill()
            this.createExplosion(bullet.x, bullet.y)
            this.updateHud()
            this.game.camera.shake(0.01, 200);
        }
    }

    spawnSaw(x, y, type) {
        let saw = new Saw(this.game, x, y, 'saw', type)
        this.obstacles.add(saw)
    }

    createSaw(x, y, type) {
        this.game.time.events.repeat(Phaser.Timer.SECOND * 0.5, 7, this.spawnSaw, this, x, y, type);
    }

    createBullets() {
        let bullets = this.game.add.group()
        bullets.enableBody = true
        bullets.physicsBodyType = Phaser.Physics.ARCADE
        bullets.createMultiple(10, 'shot')
        bullets.setAll('anchor.x', 0.5)
        bullets.setAll('anchor.y', 0.5)
        return bullets
    }

    createExplosions() {
        // cria pool de explosoes
        this.explosions = this.game.add.group()
        this.explosions.createMultiple(30, 'explosion')
        this.explosions.forEach(function (exp) {
            let anim = exp.animations.add('full', null, 60, false) // null -> array of frames
            exp.scale.setTo(0.5, 0.5)
            exp.anchor.setTo(0.5, 0.5)
            anim.onComplete.add(() => exp.kill())
        })
    }

    createExplosion(x, y) {
        let exp = this.explosions.getFirstExists(false)
        exp.reset(x, y)
        exp.animations.play('full')
    }
    
    updateBullets(bullets) {
        bullets.forEach(function (bullet) {
            this.game.world.wrap(bullet, 0, true)
        }, this)
    }*/
}