import { UI } from '../../constants/assetConstants'
import iconButton from './iconButton'


export default class inMenuSetting {

    // Определяем объекты класса
    private settingsMenu!: Phaser.GameObjects.Container

    private voiceONButton!: iconButton
    private voiceOffButton!: iconButton

    private scene: Phaser.Scene

    openSettings = false

    constructor(scene: Phaser.Scene, x: number, y: number) {

        this.scene = scene

        // Container
        this.settingsMenu = scene.add.container(x - 15, y + 15).setScale(0).setDepth(1)
        const settingsPanel = scene.add.nineslice(0, 0, UI.PANEL, undefined, 410).setOrigin(1, 0).setScale(1, 0.83)
        this.settingsMenu.add(settingsPanel)

        this.voiceONButton = new iconButton(scene, settingsPanel.width - 615, 100, 'ЗВУК', UI.VOICEON)

        this.voiceOffButton = new iconButton(scene, settingsPanel.width - 615, 100, 'БЕЗ ЗВУКА', UI.VOICEOFF).setVisible(false)

        const siteButton = new iconButton(scene, settingsPanel.width - 615, 200, 'НА САЙТ', UI.SITE)

        this.settingsMenu.add(this.voiceONButton)
        this.settingsMenu.add(this.voiceOffButton)
        this.settingsMenu.add(siteButton)

        siteButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                const siteUrl = 'https://www.example.com'
                window.open(siteUrl, '_blank')
            })

        this.voiceONButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.onMusicOff()
            })

        this.voiceOffButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
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
        this.scene.sound.setVolume(1)

        this.voiceOffButton.setVisible(false)
        this.voiceOffButton.disableInteractive()
        this.voiceONButton.setInteractive()
        this.voiceONButton.setVisible(true)
    }
}