import { Scene } from 'phaser'
import { EventBus } from '../EventBus'
import { BACKGROUNDS, UI } from '../constants/assetConstants'
import { CONFIG } from '../constants/gameConfig'

import { setCurrentScene, setReactVisible } from '../../redux/GameConfig/config.slice'
import { store } from '../../redux/store'
import BigButton from '../components/UI/bigButton'
import inMenuBurger from '../components/UI/inMenuBurger'
import inMenuSettings from '../components/UI/inMenuSettings'
import { AUDIO } from '../constants/audioConstant'

export class StartScreen extends Scene {

    // UI
    private SettingsMenu: inMenuSettings
    private BurgerMenu: inMenuBurger

    constructor() {
        super('StartScreen')
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

        // Добавляем кнопку
        const startButton = new BigButton(this, CONFIG.SCREENWIDTH / 2, CONFIG.SCREENHIGHT - 220, 'СТАРТ')
        this.add.existing(startButton)

        startButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                Click.play()
                this.cameras.main.fadeOut(500, 0, 0, 0, (_camera: any, progress: number) => {
                    if (progress === 1) {
                        store.dispatch(setCurrentScene('MainMenu'))
                        store.dispatch(setReactVisible(true))
                        this.scene.start('MainMenu')

                    }
                })
            })

        EventBus.emit('current-scene-ready', this)
    }

}
