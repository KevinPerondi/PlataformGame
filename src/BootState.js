'use strict'

class BootState extends Phaser.State {

    preload() {
        this.game.load.image('background1', 'assets/background1.jpeg')
        this.game.load.image('rain', 'assets/rain.png')
        this.game.load.image('sewer', 'assets/sewer.png');

        //objects
        this.game.load.spritesheet('coin', 'assets/coin2.png', 21, 21)
        this.game.load.image('key', 'assets/key.png')
        this.game.load.image('goldBag', 'assets/goldBag.png');
        this.game.load.image('heart', 'assets/heart.png');
        this.game.load.spritesheet('door', 'assets/door.png', 90, 96);

        //player
        this.game.load.spritesheet('player', 'assets/playerV2.png', 282, 424)

        // virtual joystick
        this.load.spritesheet('vstick_button', 'assets/button_action.png', 50, 50);
        this.load.spritesheet('vstick_dpad', 'assets/button_dpad.png', 105, 50);
        this.load.spritesheet('vstick_shootpad', 'assets/shootButton.png', 50, 50);

        //shot
        this.game.load.spritesheet('shot', 'assets/scythe.png', 450, 135);
        this.game.load.spritesheet('bossShot', 'assets/bossShot.png', 32, 32);
        this.game.load.image('poison', 'assets/poison.png');

        //enemies
        this.game.load.spritesheet('batEnemy', 'assets/batEnemy.png', 32, 32);
        this.game.load.spritesheet('redFire', 'assets/redFire.png', 40, 38);
        this.game.load.spritesheet('groundMonster', 'assets/groundMonster.png', 50, 50);
        this.game.load.spritesheet('plantMonster', 'assets/plantMonster.png', 50, 66);
        this.game.load.spritesheet('boss', 'assets/boss.png', 85, 94);
        this.game.load.image('ovni', 'assets/disco.png');
        this.game.load.image('nave1', 'assets/nave1.png');
        this.game.load.image('nave2', 'assets/nave2.png');

        // map
        this.game.load.image('groundTiles', 'assets/groundTiles.png');
        this.game.load.image('background', 'assets/background.png');
        this.game.load.tilemap('fase1', 'assets/fase1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('fase2', 'assets/fase2.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('fase3', 'assets/fase3.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('fase4', 'assets/fase4.json', null, Phaser.Tilemap.TILED_JSON);

        //audios
        this.game.load.audio('sewerSound', 'assets/sewerSounds.mp3');
        this.game.load.audio('jumpSound', 'assets/jumpSound.mp3');
    }

    create() {
        console.log("BootState created")

        this.state.start('Title')
        //this.state.start('Game')
    }
}