import { Scene } from 'phaser'
import { EventBus } from '../EventBus'
import { BACKGROUNDS, UI } from '../constants/assetConstants'
import { CONFIG } from '../constants/gameConfig'

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
        const Dog = new mascotDog(this, CONFIG.SCREENWIDTH / 2 + 306, CONFIG.SCREENHIGHT - 256).setScale(1.5)
        this.add.existing(Dog)


        // Панели выбора режима игры
        const gameModeSelector = new GameModeSelector(this)

        // Панель выбора модулей
        const selector = new ModuleCardSelector(this, 340, 237)

        EventBus.emit('current-scene-ready', this)
    }

}
