'use strict'

class BootState extends Phaser.State {

    preload() {
        this.game.load.image('background1','assets/background1.jpeg')
        this.game.load.image('rain', 'assets/rain.png')
        this.game.load.image('streetTitle', 'assets/streetTitle.png')

        //objects
        this.game.load.spritesheet('coin', 'assets/coin2.png',21,21)
        this.game.load.image('key','assets/key.png')

        //player
        this.game.load.spritesheet('player', 'assets/playerV2.png',282,424)

        // virtual joystick
        this.load.spritesheet('vstick_button', 'assets/button_action.png', 50, 50);
        this.load.spritesheet('vstick_dpad', 'assets/button_dpad.png', 105, 50);
        this.load.spritesheet('vstick_shootpad', 'assets/shootButton.png', 50, 50);

        //shot
        this.game.load.spritesheet('shot', 'assets/scythe.png', 450, 135);
        
        //enemies
        this.game.load.spritesheet('batEnemy','assets/batEnemy.png',32,32);
        this.game.load.image('ovni','assets/disco.png');
        this.game.load.image('nave1','assets/nave1.png');
        this.game.load.image('nave2','assets/nave2.png');

        // map
        /*his.game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('level2', 'assets/level2.json', null, Phaser.Tilemap.TILED_JSON)
        this.game.load.image('tiles1','assets/tileset-42x42.png');*/

        this.game.load.image('groundTiles','assets/groundTiles.png');
        this.game.load.image('background','assets/background.png');
        this.game.load.tilemap('fase1', 'assets/fase1.json', null, Phaser.Tilemap.TILED_JSON)
    }

    create() {
        console.log("BootState created")
        
        //this.state.start('Title')
        this.state.start('GameState1')
    }
}