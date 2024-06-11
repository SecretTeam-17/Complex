import { Scene } from 'phaser'
import { EventBus } from '../EventBus'
import { BACKGROUNDS, UI } from '../constants/assetConstants'
import { CONFIG } from '../constants/gameConfig'

import { setCurrentScene, setStuding } from '../../redux/GameConfig/config.slice'
import { store } from '../../redux/store'
import ModulesSlider from '../components/ModulesSlider'
import cardButton from '../components/cardButton'
import CustomButton from '../components/customButton'
import customMiniButton from '../components/customMiniButton'
import mainHeader from '../components/mainHeader'
import mascotDog from '../components/mascotDog'

export class MainMenu extends Scene {

    constructor() {
        super('MainMenu')
    }

    create() {

        this.cameras.main.fadeIn(500, 0, 0, 0)

        // Добавляем задний фон
        this.add.image(0, 0, BACKGROUNDS.STARTSCREEN).setOrigin(0, 0).setScale(1)

        // Добавляем маскотов
        const Dog = new mascotDog(this, CONFIG.SCREENWIDTH / 2 + 306, CONFIG.SCREENHIGHT - 256).setScale(1.5)
        this.add.existing(Dog)

        // Добавляем кнопки выбора режима игры
        const moduleButton = new cardButton(this, CONFIG.SCREENWIDTH - 234, 350, UI.GAME)
        this.add.existing(moduleButton).setVisible(false)
        const gameButton = new cardButton(this, CONFIG.SCREENWIDTH - 234, 350, UI.GAME)
        this.add.existing(gameButton)
        const bookButton = new cardButton(this, CONFIG.SCREENWIDTH - 234, 620, UI.BOOK)
        this.add.existing(bookButton)

        // Добавляем кнопки для взаимодействия с выбором режима игры
        const modulesChoiseButton = new customMiniButton(this, CONFIG.SCREENWIDTH - 234, 410, 'МОДУЛИ')
        const gamesChoiseButton = new customMiniButton(this, CONFIG.SCREENWIDTH - 234, 410, 'МИНИ ИГРЫ')
        const lessonsChoiseButton = new customMiniButton(this, CONFIG.SCREENWIDTH - 234, 680, 'ОБУЧЕНИЕ')

        this.add.existing(modulesChoiseButton).setVisible(false)
        this.add.existing(gamesChoiseButton)
        this.add.existing(lessonsChoiseButton)

        // Добавляем кнопку
        const startButton = new CustomButton(this, 250, CONFIG.SCREENHIGHT - 40, 'Назад').setScale(0.5)
        this.add.existing(startButton)

        startButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.scene.start('StartScreen')
                store.dispatch(setCurrentScene('StartScreen'))
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {

            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {

            })

        const modulesSlider = new ModulesSlider(this, 150, 245)
        this.add.existing(modulesSlider)

        // const gameSelector = new gameCardSelector(this, 150, 245)
        // this.add.existing(gameSelector).setVisible(false)




        gamesChoiseButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                gameButton.setVisible(false)
                moduleButton.setVisible(true)
                modulesChoiseButton.setVisible(true)
                gamesChoiseButton.setVisible(false)
                // moduleSelector.setVisible(false)
                // gameSelector.setVisible(true)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {

            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {

            })

        modulesChoiseButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                gameButton.setVisible(true)
                moduleButton.setVisible(false)
                gamesChoiseButton.setVisible(true)
                modulesChoiseButton.setVisible(false)
                // moduleSelector.setVisible(true)
                // gameSelector.setVisible(false)
            })

        lessonsChoiseButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                store.dispatch(setStuding(true))
            })

        // Добавляем хеадер
        const Header = new mainHeader(this, CONFIG.SCREENWIDTH / 2, 38)
        this.add.existing(Header)

        EventBus.emit('current-scene-ready', this)
    }

}
