import Phaser from 'phaser'
import gameConfig from './constants/gameConfig'
import { scenes } from './scenes'


const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    backgroundColor: gameConfig.backgroundColor,
    scale:{
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: gameConfig.screenWidth,
        height: gameConfig.screenHeight,
    },
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: true
        },
      },
    scene: scenes
};

const StartGame = (parent) => {

    return new Phaser.Game({ ...config, parent });

}

export default StartGame;
