import Phaser from "phaser"
import { CONFIG } from "./constants/gameConfig"
import { scenes } from "./scenes"

import { Plugin as NineSlicePlugin } from "phaser3-nineslice"

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: "game-container",
    backgroundColor: CONFIG.BACKGROUNDCOLOR,
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: CONFIG.SCREENWIDTH,
        height: CONFIG.SCREENHIGHT,
    },
    plugins: {
        global: [NineSlicePlugin.DefaultCfg],
    },
    scene: scenes,
}

const StartGame = (parent: string) => {
    return new Phaser.Game({ ...config, parent })
}

export default StartGame;

