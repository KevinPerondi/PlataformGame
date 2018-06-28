'use strict'

class TitleState extends BaseState {

    create() {

        this.rotationCount = 0;

        let backgroundWidth = this.game.cache.getImage('background1').width;
        let backgroundHeight = this.game.cache.getImage('background1').height;
        this.background = this.game.add.tileSprite(
            0, 0, backgroundWidth, backgroundHeight, 'background1');
        this.background.scale.x = this.game.width / this.background.width;
        this.background.scale.y = this.game.height / this.background.height;

        this.title = this.game.add.sprite(this.game.width/2, this.game.height*1/3, 'sewer');
        this.title.anchor.setTo(0.5, 0.5);
        this.title.scale.setTo(0.8, 0.8);

        this.pressStart = this.createText(this.game.width/2, this.game.height*2/3, 'Touch to Start', 24);
        this.info = this.createText(this.game.width/2, this.game.height-50, 'UTFPR-CM  /  2018', 18);
        this.author = this.createText(this.game.width-90, this.game.height-20, 'Kevin Perondi Regis', 16);

        let startButton = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        startButton.onDown.add(this.startGame, this)    

        this.initFullScreenButtons();
        
        console.log("TitleState created");
    }

    startGame() {
        this.state.start('Game')
        config.LEVEL = 1;
    }

    update() {
        if (this.rotationCount <= 100){
            this.background.tilePosition.x += 0.2
            this.background.tilePosition.y += 0.2
        }else if (this.rotationCount > 100 && this.rotationCount <= 200){
            this.background.tilePosition.x -= 0.1
        }else if (this.rotationCount > 200 && this.rotationCount <= 300){
            this.background.tilePosition.x -= 0.2
            this.background.tilePosition.y -= 0.2
        }else{
            this.rotationCount = 0;
        }
        this.rotationCount++;
    }

    render() {
        //obstacles.forEach(function(obj) { game.debug.body(obj) })
        //game.debug.body(player1)
        //game.debug.body(player2)
    }
}