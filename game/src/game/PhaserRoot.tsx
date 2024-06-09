import Phaser from "phaser";
import { useEffect, useState } from "react";
import { CONFIG } from "./constants/gameConfig";
import { scenes } from "./scenes";

const PhaserRoot = () => {
    // Component centralized reference to the phaser instance if needed.
    const [phaser, setPhaser] = useState<Phaser.Game>();

    // Create a new Phaser.Game instance after the initial render.
    useEffect(() => {
        let _phaser = new Phaser.Game({
            type: Phaser.AUTO,
            backgroundColor: CONFIG.BACKGROUNDCOLOR,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                parent: "phaser-parent",
                width: CONFIG.SCREENWIDTH,
                height: CONFIG.SCREENHIGHT,
            },
            scene: scenes,
            // physics: {
            //     default: 'arcade',
            //     arcade: {
            //         gravity: { y: 0 },
            //         debug: true
            //     }
            // },
        });

        setPhaser(_phaser);
    }, []);

    return <div id="phaser-parent"></div>;
};

export default PhaserRoot;

