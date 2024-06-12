import Phaser from 'phaser'
import { UI } from '../../constants/assetConstants'
import { AUDIO } from '../../constants/audioConstant'

export default class iconButton extends Phaser.GameObjects.Container {

    // Определяем объекты контейнера
    private normalImage: Phaser.GameObjects.Image
    private hoverImage: Phaser.GameObjects.Image
    private iconImage: Phaser.GameObjects.Image
    private Click!: Phaser.Sound.BaseSound

    private text: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene, x: number, y: number, text: string, icon: string) {
        // Создаем контейнер в сцене по координатам x, y
        super(scene, x, y)

        // Sound
        this.Click = scene.sound.add(AUDIO.BUTTONCLICK)

        // Добавляем изображения и текст в контейнер
        this.normalImage = scene.add.image(0, 0, UI.ICONBUTTON.NORMAL)
        this.hoverImage = scene.add.image(0, 0, UI.ICONBUTTON.HOVER)
        this.iconImage = scene.add.image(-70, 0, icon).setOrigin(0.5, 0.5)
        this.text = scene.add.text(30, 0, text, {
            fontFamily: 'Manrope',
            fontSize: '28px',
            fontStyle: 'Bold',
            color: '#FDF8F8',

        })
            .setOrigin(0.5, 0.5)

        // Отрисовываем изображения и текст
        this.add(this.normalImage)
        this.add(this.hoverImage)
        this.add(this.iconImage)
        this.add(this.text)

        // Скрываем не нужные состояния
        this.hoverImage.setVisible(false)

        this.setSize(this.normalImage.width, this.normalImage.height)


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
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.Click.play()
            })

    }

}