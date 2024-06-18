import { setStuding } from '../../../redux/GameConfig/config.slice'
import { store } from '../../../redux/store'
import { UI } from '../../constants/assetConstants'
import { CONFIG } from '../../constants/gameConfig'
import customMiniButton from '../UI/miniButton'
import cardButton from './cardButton'


export default class GameModeSelector {

    // Определяем объекты класса
    container!: Phaser.GameObjects.Container

    modulesChoiseButton!: customMiniButton
    gamesChoiseButton!: customMiniButton
    bookChoiseButton!: customMiniButton


    openSettings = false

    constructor(scene: Phaser.Scene) {

        // Container
        this.container = scene.add.container(CONFIG.SCREENWIDTH + 234, 350).setScale(1).setDepth(0.5)

        const moduleCard = new cardButton(scene, 0, 0, UI.MODULE)
        const gameCard = new cardButton(scene, 0, 0, UI.GAME)
        const bookCard = new cardButton(scene, 0, 270, UI.BOOK)

        this.modulesChoiseButton = new customMiniButton(scene, 0, 60, 'МОДУЛИ')
        this.gamesChoiseButton = new customMiniButton(scene, 0, 60, 'МИНИ ИГРЫ')
        this.bookChoiseButton = new customMiniButton(scene, 0, 330, 'ОБУЧЕНИЕ')

        this.container.add(moduleCard.setVisible(false))
        this.container.add(this.modulesChoiseButton.setVisible(false))
        this.container.add(gameCard)
        this.container.add(this.gamesChoiseButton)
        this.container.add(bookCard)
        this.container.add(this.bookChoiseButton)


        this.gamesChoiseButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                moduleCard.setVisible(true)
                gameCard.setVisible(false)

                this.gamesChoiseButton.setVisible(false)
                this.modulesChoiseButton.setVisible(true)

            })

        this.modulesChoiseButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                moduleCard.setVisible(false)
                gameCard.setVisible(true)

                this.gamesChoiseButton.setVisible(true)
                this.modulesChoiseButton.setVisible(false)

            })

        this.bookChoiseButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                store.dispatch(setStuding(true))

            })
    }
}