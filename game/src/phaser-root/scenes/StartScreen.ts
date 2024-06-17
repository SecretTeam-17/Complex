import { Scene } from 'phaser'
import { setCurrentScene, setReactVisible } from '../../redux/GameConfig/config.slice'
import { store } from '../../redux/store'
import { EventBus } from '../EventBus'
import BigButton from '../components/UI/bigButton'
import inMenuBurger from '../components/UI/inMenuBurger'
import inMenuSettings from '../components/UI/inMenuSettings'
import { AUDIO, BACKGROUNDS, UI } from '../constants/assetConstants'
import { CONFIG } from '../constants/gameConfig'

export class StartScreen extends Scene {

    // Определяем объекты класса
    private SettingsMenu: inMenuSettings
    private BurgerMenu: inMenuBurger

    constructor() {
        super('StartScreen')
    }

    create() {
        this.setupBackground()
        this.setupLogo()
        this.setupSettingsButton()
        this.setupBurgerButton()
        this.setupStartButton()

        EventBus.emit('current-scene-ready', this)
    }

    // Настройка заднего фона
    private setupBackground() {
        this.add.image(0, 0, BACKGROUNDS.STARTSCREEN).setOrigin(0, 0).setScale(1)
    }

    // Настройка логотипа
    private setupLogo() {
        const logo = this.add.image(75, 45, UI.MAINLOGO).setOrigin(0, 0)
        this.add.existing(logo)
    }

    // Настройка кнопки настроек
    private setupSettingsButton() {
        const SettingsButton = this.add.image(CONFIG.SCREENWIDTH - 210, 75, UI.SETTINGS).setDepth(1)
        this.SettingsMenu = new inMenuSettings(this, SettingsButton.x, SettingsButton.y)

        SettingsButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => SettingsButton.setScale(1.1))
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => SettingsButton.setScale(1))
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.toggleSettingsMenu.bind(this))
    }

    // Настройка кнопки меню-бургер
    private setupBurgerButton() {
        const BurgerButton = this.add.image(CONFIG.SCREENWIDTH - 105, 72, UI.BURGER).setDepth(1)
        this.BurgerMenu = new inMenuBurger(this, BurgerButton.x, BurgerButton.y)

        BurgerButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => BurgerButton.setScale(1.1))
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => BurgerButton.setScale(1))
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.toggleBurgerMenu.bind(this))
    }

    // Настройка кнопки "СТАРТ"
    private setupStartButton() {
        const startButton = new BigButton(this, CONFIG.SCREENWIDTH / 2, CONFIG.SCREENHIGHT - 220, 'СТАРТ')
        this.add.existing(startButton)

        startButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.handleStartButtonClick.bind(this))
    }

    // Переключение отображения меню настроек
    private toggleSettingsMenu() {
        const Click = this.sound.add(AUDIO.BUTTONCLICK)
        Click.play()

        if (this.SettingsMenu.openSettings) {
            this.SettingsMenu.settingsHide()
        } else {
            this.SettingsMenu.settingsShow()
            this.BurgerMenu.settingsHide()
        }
    }

    // Переключение отображения меню-бургер
    private toggleBurgerMenu() {
        const Click = this.sound.add(AUDIO.BUTTONCLICK)
        Click.play()

        if (this.BurgerMenu.openSettings) {
            this.BurgerMenu.settingsHide()
        } else {
            this.BurgerMenu.settingsShow()
            this.SettingsMenu.settingsHide()
        }
    }

    // Обработка нажатия кнопки "СТАРТ"
    private handleStartButtonClick() {
        this.cameras.main.fadeOut(500, 0, 0, 0, (_camera: any, progress: number) => {
            if (progress === 1) {
                store.dispatch(setCurrentScene('MainMenu'))
                store.dispatch(setReactVisible(true))
                this.scene.start('MainMenu')
            }
        })
    }
}