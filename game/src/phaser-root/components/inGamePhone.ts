import Phaser from 'phaser'
import { AUDIO, INGAMEUI } from '../constants/assetConstants'

export default class inGamePhone extends Phaser.GameObjects.Container {

    // Определяем объекты контейнера
    private Click!: Phaser.Sound.BaseSound

    private Phone!: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene, x: number, y: number) {
        // Создаем контейнер в сцене по координатам x, y

        super(scene, x, y)

        // Sound
        this.Click = scene.sound.add(AUDIO.BUTTONCLICK)

        // Добавляем изображение значка настроек
        this.Phone = scene.add.image(0, 0, INGAMEUI.PHONE)
        this.add(this.Phone)

        this.setSize(this.Phone.width, this.Phone.height)

        // Кнопка настроек поведение при наведении
        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.Phone.setScale(1.1)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.Phone.setScale(1)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.Click.play()
            })

    }
}