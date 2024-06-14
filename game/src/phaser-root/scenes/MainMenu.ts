import { Scene } from 'phaser'
import { EventBus } from '../EventBus'
import { BACKGROUNDS, UI } from '../constants/assetConstants'
import { CONFIG } from '../constants/gameConfig'

import { store } from '../../redux/store'
import GameModeSelector from '../components/MainMenu/GameModeSelector'
import ModuleCardSelector from '../components/MainMenu/moduleCardSelector'
import inMenuBurger from '../components/UI/inMenuBurger'
import inMenuSettings from '../components/UI/inMenuSettings'
import mascotDog from '../components/UI/mascotDog'
import { AUDIO } from '../constants/audioConstant'


export class MainMenu extends Scene {

    // UI
    private SettingsMenu: inMenuSettings
    private BurgerMenu: inMenuBurger
    private Dog: mascotDog
    private gameModeSelector: GameModeSelector
    private selector: ModuleCardSelector

    constructor() {
        super('MainMenu')
    }

    create() {

        // Sound
        const Click = this.sound.add(AUDIO.BUTTONCLICK)

        // Добавляем задний фон
        this.add.image(0, 0, BACKGROUNDS.STARTSCREEN).setOrigin(0, 0).setScale(1)

        //Добавляем лого
        const logo = this.add.image(75, 45, UI.MAINLOGO).setOrigin(0, 0)
        this.add.existing(logo)

        //Кнопка настроек
        const SettingsButton = this.add.image(CONFIG.SCREENWIDTH - 210, 75, UI.SETTINGS).setDepth(1)
        this.SettingsMenu = new inMenuSettings(this, SettingsButton.x, SettingsButton.y)

        // Кнопка настроек поведение при наведении
        SettingsButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                SettingsButton.setScale(1.1)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                SettingsButton.setScale(1)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                if (this.SettingsMenu.openSettings) {
                    Click.play()
                    this.SettingsMenu.settingsHide()
                    if (this.SettingsMenu.openSettings) { this.BurgerMenu.settingsHide() }
                }
                else {
                    Click.play()
                    this.SettingsMenu.settingsShow()
                    if (this.SettingsMenu.openSettings) { this.BurgerMenu.settingsHide() }
                }
            })

        //Кнопка бургера
        const BurgerButton = this.add.image(CONFIG.SCREENWIDTH - 105, 72, UI.BURGER).setDepth(1)
        this.BurgerMenu = new inMenuBurger(this, BurgerButton.x, BurgerButton.y)

        // Кнопка настроек поведение при наведении
        BurgerButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                BurgerButton.setScale(1.1)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                BurgerButton.setScale(1)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                if (this.BurgerMenu.openSettings) {
                    Click.play()
                    this.BurgerMenu.settingsHide()
                    if (this.BurgerMenu.openSettings) { this.SettingsMenu.settingsHide() }
                }
                else {
                    Click.play()
                    this.BurgerMenu.settingsShow()
                    if (this.BurgerMenu.openSettings) { this.SettingsMenu.settingsHide() }
                }
            })

        // Добавляем маскотов
        this.Dog = new mascotDog(this, CONFIG.SCREENWIDTH / 2 + 306, CONFIG.SCREENHIGHT - 256).setScale(1.5).setAlpha(0)
        this.add.existing(this.Dog)


        // Панели выбора режима игры
        this.gameModeSelector = new GameModeSelector(this)

        // Панель выбора модулей
        this.selector = new ModuleCardSelector(this, 340, 237)
        this.selector.cardSelector.setAlpha(0)

        // Проверяем начальное состояние
        let state = store.getState()
        let isAuth = state.config.isAuth
        if (isAuth) {
            this.Dog.setAlpha(1)
        }
        let isReact = state.config.ReactVisible
        if (!isReact) {
            this.onStoreChange()
        }

        store.subscribe(this.onStoreChange.bind(this))

        EventBus.emit('current-scene-ready', this)
    }

    onStoreChange() {
        let state = store.getState()
        let isAuth = state.config.isAuth
        let isReact = state.config.ReactVisible
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
