import Phaser from 'phaser'
import { AUDIO, INGAMEUI } from '../constants/assetConstants'

export default class InGameBox extends Phaser.GameObjects.Container {
    private box: Phaser.GameObjects.Image
    private clickSound: Phaser.Sound.BaseSound

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        // Инициализация звука клика
        this.clickSound = this.initializeClickSound(scene)

        // Добавление изображения коробки и его настройка
        this.box = this.createBoxImage(scene)
        this.add(this.box)

        // Настройка интерактивного поведения коробки
        this.setupBoxInteractions()
    }

    // Инициализация звука клика
    private initializeClickSound(scene: Phaser.Scene): Phaser.Sound.BaseSound {
        return scene.sound.add(AUDIO.BUTTONCLICK)
    }

    // Создание изображения коробки
    private createBoxImage(scene: Phaser.Scene): Phaser.GameObjects.Image {
        return scene.add.image(0, 0, INGAMEUI.BOX)
    }

    // Настройка интерактивного поведения коробки
    private setupBoxInteractions() {
        this.box.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.box.setScale(1.1)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.box.setScale(1)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.clickSound.play()
            })
    }
}