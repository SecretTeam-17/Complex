import { setCurrentScene } from '../../redux/GameConfig/config.slice'
import { store } from '../../redux/store'
import { AUDIO, UI } from '../constants/assetConstants'
import iconButton from './UI/iconButton'

export default class inGameSettingsMenu {

    // Определяем объекты класса
    private settingsMenu: Phaser.GameObjects.Container
    private voiceONButton: iconButton
    private voiceOffButton: iconButton
    private scene: Phaser.Scene
    private soundClick: Phaser.Sound.BaseSound
    openSettings = false

    constructor(scene: Phaser.Scene) {
        const { width } = scene.scale
        this.scene = scene

        // Инициализация звука нажатия кнопки
        this.soundClick = scene.sound.add(AUDIO.BUTTONCLICK)

        // Container
        this.settingsMenu = scene.add.container(width - 116, 90).setScale(0).setDepth(10)
        const settingsPanel = scene.add.nineslice(0, 20, UI.PANEL, undefined, 410).setOrigin(1, 0)
        this.settingsMenu.add(settingsPanel)

        this.voiceONButton = new iconButton(scene, settingsPanel.width - 614, settingsPanel.height / 2 - 40, 'ЗВУК', UI.VOICEON)

        this.voiceOffButton = new iconButton(scene, settingsPanel.width - 614, settingsPanel.height / 2 - 40, 'БЕЗ ЗВУКА', UI.VOICEOFF).setVisible(false)

        const exitButton = new iconButton(scene, settingsPanel.width - 614, settingsPanel.height / 2 + 70, 'В МЕНЮ', UI.SITE)

        this.settingsMenu.add(this.voiceONButton)
        this.settingsMenu.add(this.voiceOffButton)
        this.settingsMenu.add(exitButton)

        exitButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.soundClick.play()
                this.scene.cameras.main.fadeOut(500, 0, 0, 0, (_camera: any, progress: number) => {
                    if (progress === 1) {
                        store.dispatch(setCurrentScene('MainMenu'))
                        this.scene.sound.removeAll()
                        this.scene.scene.start('MainMenu')
                    }
                })
            })

        this.voiceONButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.soundClick.play()
                this.onMusicOff()
            })

        this.voiceOffButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.soundClick.play()
                this.onMusicOn()
            })

    }
    settingsShow() {
        if (this.openSettings) {
            return
        }

        this.scene.tweens.add({
            targets: this.settingsMenu,
            scaleX: 1,
            scaleY: 1,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })

        this.openSettings = true
    }

    settingsHide() {
        if (!this.openSettings) {
            return
        }

        this.scene.tweens.add({
            targets: this.settingsMenu,
            scaleX: 0,
            scaleY: 0,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })

        this.openSettings = false
    }

    private onMusicOff() {
        this.scene.sound.setVolume(0)

        this.voiceONButton.setVisible(false)
        this.voiceONButton.disableInteractive()
        this.voiceOffButton.setInteractive()
        this.voiceOffButton.setVisible(true)

    }
    private onMusicOn() {
        this.scene.sound.setVolume(0.15)

        this.voiceOffButton.setVisible(false)
        this.voiceOffButton.disableInteractive()
        this.voiceONButton.setInteractive()
        this.voiceONButton.setVisible(true)
    }
}