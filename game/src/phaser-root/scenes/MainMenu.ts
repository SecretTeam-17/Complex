import { Scene } from 'phaser'
import { EventBus } from '../EventBus'
import { BACKGROUNDS, UI } from '../constants/assetConstants'
import { CONFIG } from '../constants/gameConfig'

import { setCurrentScene } from '../../redux/GameConfig/config.slice'
import { store } from '../../redux/store'
import cardButton from '../components/cardButton'
import CustomButton from '../components/customButton'
import gameCardSelector from '../components/gameCardSelector'
import mainHeader from '../components/mainHeader'
import mascotDog from '../components/mascotDog'
import moduleCardSelector from '../components/moduleCardSelector'

export class MainMenu extends Scene {

    constructor() {
        super('MainMenu')
    }

    create() {

        this.cameras.main.fadeIn(500, 0, 0, 0)

        // Добавляем задний фон
        this.add.image(0, 0, BACKGROUNDS.STARTSCREEN).setOrigin(0, 0).setScale(1)

        // Добавляем кнопку
        const startButton = new CustomButton(this, 250, CONFIG.SCREENHIGHT - 40, 'Назад').setScale(0.5)
        this.add.existing(startButton)

        // Добавляем большие кнопки
        const moduleButton = new cardButton(this, CONFIG.SCREENWIDTH - 234, 350, 'ИСТОРИЯ', UI.GAME)
        this.add.existing(moduleButton)
        moduleButton.setVisible(false)

        const gameButton = new cardButton(this, CONFIG.SCREENWIDTH - 234, 350, 'МИНИ ИГРЫ', UI.GAME)
        this.add.existing(gameButton)

        const bookButton = new cardButton(this, CONFIG.SCREENWIDTH - 234, 620, 'ОБУЧЕНИЕ', UI.BOOK)
        this.add.existing(bookButton)

        // Добавляем маскотов
        const Dog = new mascotDog(this, CONFIG.SCREENWIDTH / 2 + 306, CONFIG.SCREENHIGHT - 256).setScale(1.5)
        this.add.existing(Dog)

        const moduleSelector = new moduleCardSelector(this, 150, 245)
        this.add.existing(moduleSelector)

        const gameSelector = new gameCardSelector(this, 150, 245)
        this.add.existing(gameSelector).setVisible(false)


        startButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.scene.start('StartScreen')
                store.dispatch(setCurrentScene('StartScreen'))
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {

            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {

            })

        gameButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                gameButton.setVisible(false)
                moduleButton.setVisible(true)
                moduleSelector.setVisible(false)
                gameSelector.setVisible(true)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {

            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {

            })

        moduleButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                gameButton.setVisible(true)
                moduleButton.setVisible(false)
                moduleSelector.setVisible(true)
                gameSelector.setVisible(false)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {

            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {

            })

        // Добавляем хеадер
        const Header = new mainHeader(this, CONFIG.SCREENWIDTH / 2, 38)
        this.add.existing(Header)

        EventBus.emit('current-scene-ready', this)
    }

}
