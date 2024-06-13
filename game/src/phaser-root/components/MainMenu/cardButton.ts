import Phaser from 'phaser'
import { UI } from '../../constants/assetConstants'

export default class cardButton extends Phaser.GameObjects.Container {

    // Определяем объекты контейнера
    private panel: Phaser.GameObjects.Image
    private Icon: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene, x: number, y: number, icon: string) {
        // Создаем контейнер в сцене по координатам x, y
        super(scene, x, y)

        // Добавляем изображения и текст в контейнер
        this.panel = scene.add.image(0, 0, UI.CARDPANEL)
        this.Icon = scene.add.image(0, -40, icon)

        // Отрисовываем изображения и текст
        this.add(this.panel)
        this.add(this.Icon)

    }

}