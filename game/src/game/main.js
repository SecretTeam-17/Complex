import Phaser from "phaser";
import { CONFIG } from "./constants/gameConfig";
import { scenes } from "./scenes";

import { Plugin as NineSlicePlugin } from "phaser3-nineslice";

const config = {
    type: Phaser.AUTO,
    parent: "game-container",
    backgroundColor: CONFIG.BACKGROUNDCOLOR,
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: CONFIG.SCREENWIDTH,
        height: CONFIG.SCREENHIGHT,
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 200 },
            debug: true,
        },
    },
    plugins: {
        global: [NineSlicePlugin.DefaultCfg],
    },
    scene: scenes,
};

const StartGame = (parent) => {
    return new Phaser.Game({ ...config, parent });
};

export default StartGame;

