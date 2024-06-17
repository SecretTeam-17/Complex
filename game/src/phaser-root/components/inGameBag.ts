import Phaser from 'phaser'
import { AUDIO, INGAMEUI } from '../constants/assetConstants'

export default class inGameBag extends Phaser.GameObjects.Container {

    private Bag: Phaser.GameObjects.Image
    private Click!: Phaser.Sound.BaseSound

    constructor(scene: Phaser.Scene, x: number, y: number) {
        // Создаем контейнер в сцене по координатам x, y

        super(scene, x, y)

        // Sound
        this.Click = scene.sound.add(AUDIO.BUTTONCLICK)

        // Добавляем изображение значка настроек
        this.Bag = scene.add.image(0, 0, INGAMEUI.BAG)
        this.add(this.Bag)

        // Кнопка настроек поведение при наведении
        this.Bag.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.Bag.setScale(1.1)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.Bag.setScale(1)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.Click.play()
            })

    }
}