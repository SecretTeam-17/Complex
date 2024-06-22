import Phaser from 'phaser'
import { setReactVisible, setStuding } from '../../../redux/GameConfig/config.slice'
import { store } from '../../../redux/store'
import { UI } from '../../constants/assetConstants'
import { CONFIG } from '../../constants/gameConfig'
import customMiniButton from '../UI/miniButton'

class cardButton extends Phaser.GameObjects.Container {

    // Определяем объекты контейнера
    public panel: Phaser.GameObjects.Image
    private Icon: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene, x: number, y: number, icon: string) {
        super(scene, x, y)

        // Добавляем изображения и текст в контейнер
        this.panel = scene.add.image(0, 0, UI.CARDPANEL)
        this.Icon = scene.add.image(0, -40, icon)

        // Отрисовываем изображения и текст
        this.add(this.panel)
        this.add(this.Icon)
    }
}

export default class GameModeSelector {

    // Определяем объекты класса
    container!: Phaser.GameObjects.Container
    modulesChoiseButton!: customMiniButton
    gamesChoiseButton!: customMiniButton
    bookChoiseButton!: customMiniButton
    private moduleCard!: cardButton
    private gameCard!: cardButton
    openSettings = false

    constructor(scene: Phaser.Scene) {
        this.initializeContainer(scene)
        this.initializeButtons(scene)
        this.setupButtonInteractions()
    }

    // Создание контейнера
    private initializeContainer(scene: Phaser.Scene) {
        this.container = scene.add.container(CONFIG.SCREENWIDTH + 234, 350).setScale(1).setDepth(0.5)
    }

    // Создание кнопки
    private initializeButtons(scene: Phaser.Scene) {
        this.moduleCard = new cardButton(scene, 0, 0, UI.MODULE).setVisible(false)
        this.gameCard = new cardButton(scene, 0, 0, UI.GAME)
        const bookCard = new cardButton(scene, 0, 270, UI.BOOK)

        this.modulesChoiseButton = new customMiniButton(scene, 0, 60, 'МОДУЛИ').setVisible(false)
        this.gamesChoiseButton = new customMiniButton(scene, 0, 60, 'МИНИ ИГРЫ')
        this.bookChoiseButton = new customMiniButton(scene, 0, 330, 'ОБУЧЕНИЕ')

        this.container.add([this.moduleCard, this.modulesChoiseButton, this.gameCard, this.gamesChoiseButton, bookCard, this.bookChoiseButton])
    }

    // Настройка интерактивного поведения кнопок 
    private setupButtonInteractions() {
        // Переключение между модулем и игрой
        this.gamesChoiseButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.switchToModuleChoice.bind(this))

        this.modulesChoiseButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.switchToGameChoice.bind(this))

        // Запуск обучения
        this.bookChoiseButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                store.dispatch(setStuding(true))
                store.dispatch(setReactVisible(true))
            })
    }

    // Переключение на выбор модуля
    private switchToModuleChoice() {
        this.moduleCard.setVisible(true)
        this.gameCard.setVisible(false)
        this.gamesChoiseButton.setVisible(false)
        this.modulesChoiseButton.setVisible(true)
    }

    // Переключение на выбор игры
    private switchToGameChoice() {
        this.moduleCard.setVisible(false)
        this.gameCard.setVisible(true)
        this.modulesChoiseButton.setVisible(false)
        this.gamesChoiseButton.setVisible(true)
    }
}