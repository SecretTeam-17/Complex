import Phaser from 'phaser'
import { MASCOTS } from '../../constants/assetConstants'

export default class mascotDog extends Phaser.GameObjects.Container {

    // Определяем объекты контейнера
    private baseImage: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene, x: number, y: number) {
        // Создаем контейнер в сцене по координатам x, y
        super(scene, x, y)

        // Добавляем изображения в контейнер
        this.baseImage = scene.add.image(0, 0, MASCOTS.MASCOTDOG.BASE).setScale(0.75)

        // Отрисовываем изображения
        this.add(this.baseImage)

        this.setSize(this.baseImage.width, this.baseImage.height)


        // Определяем действия для кнопки по навыедению и нажатию
        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {

            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {

            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {

            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {

            })

    }

}