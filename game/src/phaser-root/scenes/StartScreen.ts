import { Scene } from 'phaser'
import { EventBus } from '../EventBus'
import { BACKGROUNDS } from '../constants/assetConstants'
import { CONFIG } from '../constants/gameConfig'

import { setCurrentScene } from '../../redux/GameConfig/config.slice'
import { store } from '../../redux/store'
import CustomButton from '../components/customButton'
import mainHeader from '../components/mainHeader'

export class StartScreen extends Scene {

    constructor() {
        super('StartScreen')
    }

    create() {

        // Добавляем задний фон
        this.add.image(0, 0, BACKGROUNDS.STARTSCREEN).setOrigin(0, 0).setScale(1)

        // Добавляем хеадер
        const Header = new mainHeader(this, CONFIG.SCREENWIDTH / 2, 38)
        this.add.existing(Header)

        // Добавляем кнопку
        const startButton = new CustomButton(this, CONFIG.SCREENWIDTH / 2, CONFIG.SCREENHIGHT - 220, 'СТАРТ')
        this.add.existing(startButton)

        startButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.cameras.main.fadeOut(500, 0, 0, 0, (_camera: any, progress: number) => {
                    if (progress === 1) {
                        store.dispatch(setCurrentScene('MainMenu'))
                        this.scene.start('MainMenu')

                    }
                })
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {

            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {

            })

        EventBus.emit('current-scene-ready', this)
    }

}
