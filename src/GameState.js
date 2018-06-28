'use strict'

class GameState extends BaseState {

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        this.game.physics.arcade.gravity.y = 650;

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
        //this.rain.alpha = 0.4
        this.rain.fixedToCamera = true

        this.createTileMap()

        let vpad = new VirtualGamepad(this.game)
        this.game.add.existing(vpad)

        let jumpButton = vpad.addActionButton(
            this.game.width - 100, this.game.height - 100, 'vstick_button',
            () => this.player1.jump());

        let shootButton = vpad.addActionButton(
            this.game.width - 210, this.game.height - 100, 'vstick_shootpad',
            () => this.player1.shootScythe());


        let dpadButton = vpad.addDPadButton(
            155, this.game.height - 100, 'vstick_dpad', {
                leftPressed: () => this.player1.cursors.left.isDown = true,
                leftReleased: () => this.player1.cursors.left.isDown = false,
                rightPressed: () => this.player1.cursors.right.isDown = true,
                rightReleased: () => this.player1.cursors.right.isDown = false
            });

        //this.createScythes();

        let backgroundSound;
        if(config.LEVEL == 4){

        }else{
            backgroundSound = this.game.add.audio('sewer');
            backgroundSound.loop = true;
            //backgroundSound.volume -= 0.8;
            backgroundSound.play();
        }

        if (config.LEVEL == 3) {
            this.player1 = new Player(this.game, 1500, 2050,
                'player', {
                    left: Phaser.Keyboard.LEFT,
                    right: Phaser.Keyboard.RIGHT,
                    jump: Phaser.Keyboard.UP
                }, config.PLAYERSCORE);
        } else if (config.LEVEL == 4) {
            this.player1 = new Player(this.game, 1350, 1650,
                'player', {
                    left: Phaser.Keyboard.LEFT,
                    right: Phaser.Keyboard.RIGHT,
                    jump: Phaser.Keyboard.UP
                }, config.PLAYERSCORE);
        }
        else {
            this.player1 = new Player(this.game, 100, 100,
                'player', {
                    left: Phaser.Keyboard.LEFT,
                    right: Phaser.Keyboard.RIGHT,
                    jump: Phaser.Keyboard.UP
                }, config.PLAYERSCORE);
        }




        this.game.add.existing(this.player1)
        this.game.camera.follow(this.player1, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1); // smooth        

        this.hud = {
            text1: this.createText(this.game.width * 1 / 9, 50, 'Health: 20'),
            playerScore: this.createText(this.game.width * 8 / 9, 50, 'Pontuação: 0')
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

        this.map = this.game.add.tilemap(`fase${config.LEVEL}`)
        this.map.addTilesetImage('groundTiles');
        this.map.addTilesetImage('background');
        this.map.addTilesetImage('coin2');

        this.mapLayer = this.map.createLayer('Background Layer');
        this.mapLayer = this.map.createLayer('Tiles Layer 1');
        this.map.setCollisionBetween(0, 17, true, 'Tiles Layer 1');

        this.createCollectables();

        this.createEnemies();

        this.mapLayer.resizeWorld();

    }

    createCollectables() {
        this.coins = this.game.add.group();
        this.keys = this.game.add.group();
        this.keys.enableBody = true;
        this.goldBags = this.game.add.group();
        this.hearts = this.game.add.group();
        this.doors = this.game.add.group();

        this.map.createFromObjects('Object Layer', 55, 'coin', 0, true, true, this.coins, Coin);
        this.map.createFromObjects('Object Layer', 54, 'key', 0, true, true, this.keys);
        this.map.createFromObjects('Object Layer', 69, 'goldBag', 0, true, true, this.goldBags, GoldBag);
        this.map.createFromObjects('Object Layer', 70, 'heart', 0, true, true, this.hearts, Heart);
        this.map.createFromObjects('Object Layer', 71, 'door', 0, true, true, this.doors, Door);

        this.keys.forEach(function (key) {
            key.body.allowGravity = false;
        });

    }

    createEnemies() {
        this.batEnemies = this.game.add.group();
        this.ovniEnemies = this.game.add.group();
        this.spaceOneEnemies = this.game.add.group();
        this.spaceTwoEnemies = this.game.add.group();
        this.redFire = this.game.add.group();
        this.groundMonsters = this.game.add.group();
        this.plantMonsters = this.game.add.group();
        this.bosses = this.game.add.group();

        this.map.createFromObjects('Enemies Layer', 51, 'batEnemy', 0, true, true, this.batEnemies, Bat);
        this.map.createFromObjects('Enemies Layer', 63, 'ovni', 0, true, true, this.ovniEnemies, Ovni);
        this.map.createFromObjects('Enemies Layer', 64, 'nave1', 0, true, true, this.spaceOneEnemies, SpaceOne);
        this.map.createFromObjects('Enemies Layer', 65, 'nave2', 0, true, true, this.spaceTwoEnemies, SpaceTwo);
        this.map.createFromObjects('Enemies Layer', 66, 'redFire', 0, true, true, this.redFire, Fire);
        this.map.createFromObjects('Enemies Layer', 73, 'groundMonster', 0, true, true, this.groundMonsters, GroundMonster);
        this.map.createFromObjects('Enemies Layer', 77, 'plantMonster', 0, true, true, this.plantMonsters, PlantMonster);
        this.map.createFromObjects('Enemies Layer', 79, 'boss', 0, true, true, this.bosses, Boss);

    }

    toggleFullScreen() {
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        if (this.game.scale.isFullScreen) {
            this.game.scale.stopFullScreen();
        } else {
            this.game.scale.startFullScreen(false);
        }
    }

    collisions() {

        // colisoes com mapa
        this.game.physics.arcade.collide(this.player1, this.mapLayer);
        this.game.physics.arcade.collide(this.batEnemies, this.mapLayer);
        this.game.physics.arcade.collide(this.ovniEnemies, this.mapLayer);
        this.game.physics.arcade.collide(this.spaceOneEnemies, this.mapLayer);
        this.game.physics.arcade.collide(this.spaceTwoEnemies, this.mapLayer);
        this.game.physics.arcade.collide(this.redFire, this.mapLayer);
        this.game.physics.arcade.collide(this.groundMonsters, this.mapLayer);
        this.game.physics.arcade.collide(this.plantMonsters, this.mapLayer);
        this.game.physics.arcade.collide(this.plantMonsters.poisons, this.mapLayer);

        //foice colidindo
        this.game.physics.arcade.overlap(this.player1.scythes, this.batEnemies, this.weaponHitEnemy);
        this.game.physics.arcade.overlap(this.player1.scythes, this.ovniEnemies, this.weaponHitEnemy);
        this.game.physics.arcade.overlap(this.player1.scythes, this.spaceOneEnemies, this.weaponHitEnemy);
        this.game.physics.arcade.overlap(this.player1.scythes, this.spaceTwoEnemies, this.weaponHitEnemy);
        this.game.physics.arcade.overlap(this.player1.scythes, this.groundMonsters, this.weaponHitEnemy);
        this.game.physics.arcade.overlap(this.player1.scythes, this.plantMonsters, this.weaponHitEnemy);
        this.game.physics.arcade.overlap(this.player1.scythes, this.bosses, this.scytheHitBoss);
        this.game.physics.arcade.collide(this.player1.scythes, this.mapLayer);


        //colisao com inimigos
        this.game.physics.arcade.collide(this.player1, this.batEnemies, this.enemyCollide);
        this.game.physics.arcade.collide(this.player1, this.ovniEnemies, this.enemyCollide);
        this.game.physics.arcade.collide(this.player1, this.spaceOneEnemies, this.enemyCollide);
        this.game.physics.arcade.collide(this.player1, this.spaceTwoEnemies, this.enemyCollide);
        this.game.physics.arcade.overlap(this.player1, this.redFire, this.fireCollide, null, this);
        this.game.physics.arcade.overlap(this.player1, this.groundMonsters, this.enemyCollide, null, this);
        this.game.physics.arcade.overlap(this.player1, this.plantMonsters, this.enemyCollide, null, this);
        this.plantMonsters.forEach(function (plant) {
            this.game.physics.arcade.overlap(this.player1, plant.poisons, this.poisonHitPlayer);
        }, this);
        this.plantMonsters.forEach(function (plant) {
            this.game.physics.arcade.collide(plant.poisons, this.mapLayer, this.shotCollideMap);
        }, this);

        //colisao com colecionaveis
        this.game.physics.arcade.overlap(this.player1, this.coins, this.collectibleCollide, null, this);
        this.game.physics.arcade.overlap(this.player1, this.goldBags, this.collectibleCollide, null, this);
        this.game.physics.arcade.overlap(this.player1, this.keys, this.keyCollide, null, this);
        this.game.physics.arcade.overlap(this.player1, this.hearts, this.heartCollide, null, this);
        //colidindo com a porta
        this.game.physics.arcade.overlap(this.player1, this.doors, this.doorCollide, null, this);

        //colisao com boss
        this.game.physics.arcade.overlap(this.player1, this.bosses, this.playerTouchBoss, null, this);
        this.bosses.forEach(function (boss) {
            this.game.physics.arcade.overlap(this.player1, boss.shots, this.poisonHitPlayer);
        }, this);
        this.bosses.forEach(function (boss) {
            this.game.physics.arcade.collide(boss.shots, this.mapLayer, this.shotCollideMap);
        }, this);
    }

    loadNextLevel() {
        config.PLAYERSCORE = this.player1.score;
        backgroundSound.stop();
        if (config.LEVEL == 4) {
            this.state.start('Title');
            //config.LEVEL = 1;
            //this.game.state.restart();
        } else {
            config.LEVEL++;
            this.game.state.restart();
        }
    }

    update() {
        if (!this.player1.alive) {
            this.game.camera.follow(null); // smooth   
            config.PLAYERSCORE = 0;
            backgroundSound.stop();
            this.game.state.restart();
        }
        this.updateHud();
        this.rain.tilePosition.x += 1;
        this.collisions();
    }

    scytheHitBoss(scythe, boss) {
        scythe.kill();
        boss.health--;
    }

    shotCollideMap(shot, map) {
        shot.kill();
    }

    playerTouchBoss(player, boss) {
        player.kill();
    }

    poisonHitPlayer(player, poison) {
        player.health -= poison.damage;
        poison.kill();
    }

    weaponHitEnemy(scythe, enemy) {
        //scythe.kill();
        enemy.kill();
    }

    heartCollide(player, heart) {
        player.health += heart.healthValue;
        heart.kill();
    }

    doorCollide(player, door) {
        if (player.getKey == true) {
            this.loadNextLevel();
        }
    }

    collectibleCollide(player, item) {
        player.score += item.score;
        item.kill();
        this.updateHud();
    }

    fireCollide(player, fire) {
        player.health -= fire.damage;
        fire.reduceDamage();
    }

    enemyCollide(player, enemy) {
        player.health -= enemy.damage;
        enemy.kill();
    }

    keyCollide(player, key) {
        player.getKey = true;
        key.destroy();
        this.doors.forEach(function (door) {
            door.changeDoorStatus();
        });
    }


    updateHud() {
        if (this.player1.health <= 0) {
            this.hud.text1.text = `Health: 0`
        } else {
            this.hud.text1.text = `Health: ${this.player1.health}`
            this.hud.playerScore.text = `Pontuação: ${this.player1.score}`
        }
    }

    render() {
        this.game.debug.body(this.player1);

        this.coins.forEach(function (coin) {
            this.game.debug.body(coin)
        }, this);

        this.goldBags.forEach(function (bag) {
            this.game.debug.body(bag)
        }, this);

        this.hearts.forEach(function (heart) {
            this.game.debug.body(heart)
        }, this);

        this.doors.forEach(function (door) {
            this.game.debug.body(door)
        }, this);

        this.keys.forEach(function (key) {
            this.game.debug.body(key)
        }, this);

        this.batEnemies.forEach(function (bat) {
            this.game.debug.body(bat)
        }, this);

        this.spaceOneEnemies.forEach(function (ship) {
            this.game.debug.body(ship)
        }, this);

        this.groundMonsters.forEach(function (monster) {
            this.game.debug.body(monster)
        }, this);

        this.plantMonsters.forEach(function (plant) {
            this.game.debug.body(plant)
        }, this);

        this.spaceTwoEnemies.forEach(function (ship) {
            this.game.debug.body(ship)
        }, this);

        this.redFire.forEach(function (fire) {
            this.game.debug.body(fire)
        }, this);

        this.ovniEnemies.forEach(function (ovni) {
            this.game.debug.body(ovni)
        }, this);

        this.player1.scythes.forEach(function (scythe) {
            this.game.debug.body(scythe)
        }, this);
    }
}