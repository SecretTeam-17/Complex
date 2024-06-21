import Phaser from 'phaser'
import { AUDIO, INGAMEUI } from '../constants/assetConstants'

export default class InGamePhone extends Phaser.GameObjects.Container {
    // Определяем объекты контейнера
    private clickSound!: Phaser.Sound.BaseSound
    private phone!: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        // Инициализация звука клика
        this.clickSound = this.initializeClickSound(scene)

        // Добавление изображения телефона
        this.phone = this.createPhoneImage(scene)

        // Установка размера контейнера по размеру телефона
        this.setSize(this.phone.width, this.phone.height)

        // Добавление изображения телефона в контейнер
        this.add(this.phone)

        // Настройка интерактивного поведения телефона
        this.setupPhoneInteractions()
    }

    // Инициализация звука клика
    private initializeClickSound(scene: Phaser.Scene): Phaser.Sound.BaseSound {
        return scene.sound.add(AUDIO.BUTTONCLICK)
    }

    // Создание изображения телефона
    private createPhoneImage(scene: Phaser.Scene): Phaser.GameObjects.Image {
        return scene.add.image(0, 0, INGAMEUI.PHONE)
    }

    // Настройка интерактивного поведения телефона
    private setupPhoneInteractions() {
        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.phone.setScale(1.1)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.phone.setScale(1)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.clickSound.play()
            })
    }
}