import { setCurrentScene } from '../../redux/GameConfig/config.slice'
import { store } from '../../redux/store'
import { AUDIO, UI } from '../constants/assetConstants'
import iconButton from './UI/iconButton'

export default class InGameSettingsMenu {
    // Определяем объекты класса
    private settingsMenu: Phaser.GameObjects.Container
    private voiceONButton: iconButton
    private voiceOffButton: iconButton
    private scene: Phaser.Scene
    private soundClick: Phaser.Sound.BaseSound
    openSettings: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.scene = scene
        this.soundClick = scene.sound.add(AUDIO.BUTTONCLICK)

        this.settingsMenu = this.createSettingsMenu(x, y)
        this.voiceONButton = this.createVoiceButton(UI.VOICEON, 'ЗВУК', true)
        this.voiceOffButton = this.createVoiceButton(UI.VOICEOFF, 'БЕЗ ЗВУКА', false)
        const exitButton = this.createExitButton(UI.SITE, 'В МЕНЮ')

        this.settingsMenu.add([this.voiceONButton, this.voiceOffButton, exitButton])
        this.setupButtonInteractions(exitButton, this.exitToMainMenu.bind(this))
        this.setupButtonInteractions(this.voiceONButton, this.onMusicOff.bind(this))
        this.setupButtonInteractions(this.voiceOffButton, this.onMusicOn.bind(this))
    }

    // Создание контейнера меню настроек
    private createSettingsMenu(x: number, y: number): Phaser.GameObjects.Container {
        const settingsMenu = this.scene.add.container(x - 15, y + 15).setScale(0).setDepth(10)
        const settingsPanel = this.scene.add.nineslice(0, 0, UI.PANEL, undefined, 410).setOrigin(1, 0).setScale(1, 0.83)
        settingsMenu.add(settingsPanel)
        return settingsMenu
    }

    // Создание кнопки управления звуком
    private createVoiceButton(texture: string, text: string, visible: boolean): iconButton {
        return new iconButton(this.scene, 410 - 615, 100, text, texture).setVisible(visible)
    }

    // Создание кнопки выхода в главное меню
    private createExitButton(texture: string, text: string): iconButton {
        return new iconButton(this.scene, 410 - 615, 200, text, texture)
    }

    // Настройка интерактивного поведения кнопок
    private setupButtonInteractions(button: Phaser.GameObjects.GameObject, callback: () => void) {
        button.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
            this.soundClick.play()
            callback()
        })
    }

    // Переход в главное меню
    private exitToMainMenu() {
        this.scene.cameras.main.fadeOut(500, 0, 0, 0, (_camera: any, progress: number) => {
            if (progress === 1) {
                store.dispatch(setCurrentScene('MainMenu'))
                this.scene.sound.removeAll()
                this.scene.scene.start('MainMenu')
            }
        })
    }

    // Показать меню настроек
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

    // Выключение музыки
    private onMusicOff() {
        this.scene.sound.setVolume(0)
        this.toggleVoiceButtons(false)
    }

    // Включение музыки
    private onMusicOn() {
        this.scene.sound.setVolume(0.5)
        this.toggleVoiceButtons(true)
    }

    // Переключение состояния кнопок управления звуком
    private toggleVoiceButtons(soundOn: boolean) {
        this.voiceONButton.setVisible(soundOn).setInteractive(soundOn)
        this.voiceOffButton.setVisible(!soundOn).setInteractive(!soundOn)
    }
}