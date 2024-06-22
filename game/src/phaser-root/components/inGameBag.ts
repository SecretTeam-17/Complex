import Phaser from 'phaser'
import { AUDIO, INGAMEUI } from '../constants/assetConstants'

export default class InGameBag extends Phaser.GameObjects.Container {
    private bag: Phaser.GameObjects.Image
    private clickSound: Phaser.Sound.BaseSound

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        // Инициализация звука клика
        this.clickSound = this.initializeClickSound(scene)

        // Добавление изображения сумки и его настройка
        this.bag = this.createBagImage(scene)
        this.add(this.bag)

        // Установка размера контейнера по размеру телефона
        this.setSize(this.bag.width, this.bag.height)

        // Настройка интерактивного поведения сумки
        this.setupBagInteractions()
    }

    // Инициализация звука клика
    private initializeClickSound(scene: Phaser.Scene): Phaser.Sound.BaseSound {
        return scene.sound.add(AUDIO.BUTTONCLICK)
    }

    // Создание изображения сумки
    private createBagImage(scene: Phaser.Scene): Phaser.GameObjects.Image {
        return scene.add.image(0, 0, INGAMEUI.BAG)
    }

    // Настройка интерактивного поведения сумки
    private setupBagInteractions() {
        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.bag.setScale(1.1)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.bag.setScale(1)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.clickSound.play()
            })
    }
}