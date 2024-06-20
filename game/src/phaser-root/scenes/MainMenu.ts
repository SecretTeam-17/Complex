import { Scene } from 'phaser'
import { store } from '../../redux/store'
import { EventBus } from '../EventBus'
import GameModeSelector from '../components/MainMenu/GameModeSelector'
import GameCardSelector from '../components/MainMenu/gameCardSelector'
import ModuleCardSelector from '../components/MainMenu/moduleCardSelector'
import inMenuBurger from '../components/UI/inMenuBurger'
import inMenuSettings from '../components/UI/inMenuSettings'
import mascotDog from '../components/UI/mascotDog'
import { AUDIO, BACKGROUNDS, UI } from '../constants/assetConstants'
import { CONFIG } from '../constants/gameConfig'

export class MainMenu extends Scene {

    // Определяем объекты класса
    private SettingsMenu: inMenuSettings
    private BurgerMenu: inMenuBurger
    private Dog: mascotDog
    private gameModeSelector: GameModeSelector
    private selector: ModuleCardSelector
    selector2: GameCardSelector

    constructor() {
        super('MainMenu')
    }

    create() {
        const clickSound = this.sound.add(AUDIO.BUTTONCLICK)

        this.setupBackground()
        this.setupLogo()
        this.setupSettingsButton(clickSound)
        this.setupBurgerButton(clickSound)
        this.setupMascotDog()
        this.setupSelectors()
        this.handleStoreSubscription()

        EventBus.emit('current-scene-ready', this)
    }

    // Настройка фона
    private setupBackground() {
        this.add.image(0, 0, BACKGROUNDS.STARTSCREEN).setOrigin(0, 0).setScale(1)
    }

    // Настройка логотипа
    private setupLogo() {
        const logo = this.add.image(75, 45, UI.MAINLOGO).setOrigin(0, 0)
        this.add.existing(logo)
    }

    // Настройка кнопки настроек
    private setupSettingsButton(clickSound: Phaser.Sound.BaseSound) {
        const settingsButton = this.add.image(CONFIG.SCREENWIDTH - 210, 75, UI.SETTINGS).setDepth(1)
        this.SettingsMenu = new inMenuSettings(this, settingsButton.x, settingsButton.y)
        this.setupInteractive(settingsButton, clickSound, () => {
            const state = store.getState()
            const isReact = state.config.ReactVisible
            if (!isReact) {
                if (this.SettingsMenu.openSettings) {
                    this.SettingsMenu.settingsHide()
                    this.BurgerMenu.settingsHide()
                } else {
                    this.SettingsMenu.settingsShow()
                    this.BurgerMenu.settingsHide()
                }
            }
        })
    }

    // Настройка кнопки бургера
    private setupBurgerButton(clickSound: Phaser.Sound.BaseSound) {
        const burgerButton = this.add.image(CONFIG.SCREENWIDTH - 105, 72, UI.BURGER).setDepth(1)
        this.BurgerMenu = new inMenuBurger(this, burgerButton.x, burgerButton.y)
        this.setupInteractive(burgerButton, clickSound, () => {
            const state = store.getState()
            const isReact = state.config.ReactVisible
            if (!isReact) {
                if (this.BurgerMenu.openSettings) {
                    this.BurgerMenu.settingsHide()
                    this.SettingsMenu.settingsHide()
                } else {
                    this.BurgerMenu.settingsShow()
                    this.SettingsMenu.settingsHide()
                }
            }
        })
    }

    // Настройка интерактивного поведения кнопки
    private setupInteractive(button: Phaser.GameObjects.Image, clickSound: Phaser.Sound.BaseSound, onClick: () => void) {
        button.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => button.setScale(1.1))
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => button.setScale(1))
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                clickSound.play()
                onClick()
            })
    }

    // Настройка маскота собаки
    private setupMascotDog() {
        this.Dog = new mascotDog(this, CONFIG.SCREENWIDTH / 2 + 306, CONFIG.SCREENHIGHT - 256).setScale(1.5).setAlpha(0)
        this.add.existing(this.Dog)
    }

    // Настройка панелей выбора режимов и модулей
    private setupSelectors() {
        this.gameModeSelector = new GameModeSelector(this)
        this.selector = new ModuleCardSelector(this, 340, 237)
        this.selector2 = new GameCardSelector(this, 340, 237)
        this.selector.cardSelector.setAlpha(0)
        this.selector2.cardSelector.setAlpha(0)
        this.gameModeSelector.gamesChoiseButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.selector.cardSelector.setAlpha(0)
                this.selector2.cardSelector.setAlpha(1)
            })
        this.gameModeSelector.modulesChoiseButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.selector.cardSelector.setAlpha(1)
                this.selector2.cardSelector.setAlpha(0)
            })
    }

    // Обработка подписки на изменения в store
    private handleStoreSubscription() {
        const onStoreChange = this.onStoreChange.bind(this)
        store.subscribe(onStoreChange)
        onStoreChange() // Инструкция для обновления начального состояния
    }


    // Обработчик изменений в store
    private onStoreChange() {
        const state = store.getState()
        const isAuth = state.config.isAuth
        const isReact = state.config.ReactVisible

        if (isAuth) {
            this.tweens.add({
                targets: this.Dog,
                alpha: 1,
                duration: 100
            })
            if (!isReact) {
                this.tweens.add({
                    targets: this.gameModeSelector.container,
                    x: CONFIG.SCREENWIDTH - 234,
                    duration: 300,
                    ease: Phaser.Math.Easing.Sine.InOut,
                })
                this.tweens.add({
                    targets: this.selector.cardSelector,
                    alpha: 1,
                    duration: 500
                })
            }
        }
    }
}