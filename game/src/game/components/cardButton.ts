import Phaser from 'phaser'
import { UI } from '../constants/assetConstants'

export default class cardButton extends Phaser.GameObjects.Container {

    // Определяем объекты контейнера
    private panel: Phaser.GameObjects.Image
    private Icon: Phaser.GameObjects.Image

    private normalImage: Phaser.GameObjects.Image
    private hoverImage: Phaser.GameObjects.Image

    private text: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene, x: number, y: number, text: string, icon: string) {
        // Создаем контейнер в сцене по координатам x, y
        super(scene, x, y)

        // Button
        this.normalImage = scene.add.image(0, 60, UI.ICONBUTTON.NORMAL).setScale(0.85)
        this.hoverImage = scene.add.image(0, 60, UI.ICONBUTTON.HOVER).setScale(0.85)

        // Добавляем изображения и текст в контейнер
        this.panel = scene.add.image(0, 0, UI.CARDPANEL)
        this.Icon = scene.add.image(0, -40, icon)
        this.text = scene.add.text(0, 60, text, {
            fontFamily: 'Manrope',
            fontSize: '28px',
            fontStyle: 'Bold',
            color: '#FDF8F8',
        })
            .setOrigin(0.5, 0.5)

        // Отрисовываем изображения и текст
        this.add(this.panel)
        this.add(this.Icon)
        this.add(this.normalImage)
        this.add(this.hoverImage)
        this.add(this.text)

        // Скрываем не нужные состояния
        this.hoverImage.setVisible(false)

        this.setSize(this.panel.width, this.panel.height)


        // Определяем действия для кнопки по навыедению и нажатию
        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.normalImage.setVisible(false)
                this.hoverImage.setVisible(true)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.normalImage.setVisible(true)
                this.hoverImage.setVisible(false)
            })

    }

}