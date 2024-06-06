import { Scene } from 'phaser'
import { EventBus } from '../EventBus'
import { BACKGROUNDS, UI } from '../constants/assetConstants'
import { CONFIG } from '../constants/gameConfig'

import CustomButton from '../components/customButton'
import iconButton from '../components/iconButton'
import mainHeader from '../components/mainHeader'

export class StartScreen extends Scene
{

    constructor ()
    {
        super('StartScreen');
    }

    create ()
    {
        // Добавляем задний фон
        this.add.image(0, 0, BACKGROUNDS.STARTSCREEN).setOrigin(0,0).setScale(0.5)

        // Добавляем хеадер
        const Header = new mainHeader(this, CONFIG.SCREENWIDTH / 2, 24)
        this.add.existing(Header)

        // Добавляем кнопку
        const startButton = new CustomButton(this, CONFIG.SCREENWIDTH / 2, CONFIG.SCREENHIGHT - 140, 'СТАРТ')
        this.add.existing(startButton)




        startButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {

        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {

        })

        EventBus.emit('current-scene-ready', this);
    }

}
