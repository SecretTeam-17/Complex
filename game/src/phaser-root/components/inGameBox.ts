import Phaser from 'phaser'
import { AUDIO, INGAMEUI } from '../constants/assetConstants'

export default class inGameBox extends Phaser.GameObjects.Container {

    private Box: Phaser.GameObjects.Image
    private Click!: Phaser.Sound.BaseSound

    constructor(scene: Phaser.Scene, x: number, y: number) {
        // Создаем контейнер в сцене по координатам x, y

        super(scene, x, y)

        // Sound
        this.Click = scene.sound.add(AUDIO.BUTTONCLICK)

        // Добавляем изображение значка настроек
        this.Box = scene.add.image(0, 0, INGAMEUI.BOX)
        this.add(this.Box)

        // Кнопка настроек поведение при наведении
        this.Box.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.Box.setScale(1.1)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.Box.setScale(1)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.Click.play()
            })

    }
}