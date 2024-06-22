import Phaser from 'phaser'
import { UI } from '../../constants/assetConstants'
import iconButton from './iconButton'

export default class inMenuSetting {

    // Определяем объекты класса
    private settingsMenu: Phaser.GameObjects.Container
    private voiceONButton: iconButton
    private voiceOffButton: iconButton
    private scene: Phaser.Scene
    openSettings = false

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.scene = scene
        this.settingsMenu = this.createSettingsMenu(x, y)
        this.voiceONButton = this.createVoiceButton(UI.VOICEON, 'ЗВУК', true)
        this.voiceOffButton = this.createVoiceButton(UI.VOICEOFF, 'БЕЗ ЗВУКА', false)
        const siteButton = this.createSiteButton(UI.SITE, 'НА САЙТ')

        this.settingsMenu.add([this.voiceONButton, this.voiceOffButton, siteButton])
        this.setupButtonInteractions(siteButton)
        this.setupButtonInteractions(this.voiceONButton, this.onMusicOff.bind(this))
        this.setupButtonInteractions(this.voiceOffButton, this.onMusicOn.bind(this))
    }

    // Создание контейнера меню настроек
    private createSettingsMenu(x: number, y: number): Phaser.GameObjects.Container {
        const settingsMenu = this.scene.add.container(x - 15, y + 15).setScale(0).setDepth(1)
        const settingsPanel = this.scene.add.nineslice(0, 0, UI.PANEL, undefined, 410).setOrigin(1, 0).setScale(1, 0.83)
        settingsMenu.add(settingsPanel)
        return settingsMenu
    }

    // Создание кнопки управления звуком
    private createVoiceButton(texture: string, text: string, visible: boolean): iconButton {
        const button = new iconButton(this.scene, 410 - 615, 100, text, texture).setVisible(visible)
        return button
    }

    // Создание кнопки для перехода на сайт
    private createSiteButton(texture: string, text: string): iconButton {
        return new iconButton(this.scene, 410 - 615, 200, text, texture)
    }

    // Настройка интерактивного поведения кнопки
    private setupButtonInteractions(button: Phaser.GameObjects.GameObject, callback?: () => void) {
        button.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                if (callback) callback()
                else window.open('https://pet-sitter.ru/', '_blank')
            })
    }

    // Показ меню настроек
    settingsShow() {
        if (this.openSettings) return

        this.scene.tweens.add({
            targets: this.settingsMenu,
            scaleX: 1,
            scaleY: 1,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })
        this.openSettings = true
    }

    // Скрытие меню настроек
    settingsHide() {
        if (!this.openSettings) return

        this.scene.tweens.add({
            targets: this.settingsMenu,
            scaleX: 0,
            scaleY: 0,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })
        this.openSettings = false
    }

    // Выключение звука
    private onMusicOff() {
        this.scene.sound.setVolume(0)
        this.toggleVoiceButtons(false)
    }

    // Включение звука
    private onMusicOn() {
        this.scene.sound.setVolume(1)
        this.toggleVoiceButtons(true)
    }

    // Переключение состояния кнопок управления звуком
    private toggleVoiceButtons(soundOn: boolean) {
        this.voiceONButton.setVisible(soundOn).setInteractive(soundOn)
        this.voiceOffButton.setVisible(!soundOn).setInteractive(!soundOn)
    }
}