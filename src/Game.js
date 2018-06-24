'use strict'

/**
 * Exemplo versão 02
 * - ECMAScript 6
 * - touch controls
 * - botão de fullscreen para mobile
 * - tileMap
 */

const config = {}
config.RES_X = 800 // resolucao HD
config.RES_Y = 480

class Game extends Phaser.Game {
    constructor() {
        super(config.RES_X, config.RES_Y, Phaser.CANVAS,
            'game-container')
        // registrando as telas (Phaser.State) do jogo
        this.state.add('Boot', BootState, false)
        //this.state.add('Title', TitleState, false)
        this.state.add('GameState1', GameState, false)
        this.state.add('GameState2', GameState, false)
        this.state.add('GameState3', GameState, false)
        this.state.add('GameStateFinal', GameState, false)
        this.state.start('Boot')
    }
}

// cria jogo
let GAME = new Game()
/*
window.onload = function() {
    // funciona como singleton
    GAME = new Game()
}
*/