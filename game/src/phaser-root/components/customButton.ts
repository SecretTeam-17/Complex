import Phaser from 'phaser'
import { UI } from '../constants/assetConstants'
import { AUDIO } from '../constants/audioConstant'

export default class CustomButton extends Phaser.GameObjects.Container {

    // Определяем объекты контейнера
    private normalImage: Phaser.GameObjects.Image
    private hoverImage: Phaser.GameObjects.Image
    private disableImage: Phaser.GameObjects.Image

    private soundClick: Phaser.Sound.BaseSound

    private text: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene, x: number, y: number, text: string) {
        // Создаем контейнер в сцене по координатам x, y
        super(scene, x, y)


        // Sound
        this.soundClick = scene.sound.add(AUDIO.BUTTONCLICK)

        // Добавляем изображения и текст в контейнер
        this.normalImage = scene.add.image(0, 0, UI.BUTTON.NORMAL)
        this.hoverImage = scene.add.image(0, -15, UI.BUTTON.HOVER)
        this.disableImage = scene.add.image(0, 0, UI.BUTTON.DISABLE)
        this.text = scene.add.text(0, 0, text, {
            fontFamily: 'Manrope',
            fontSize: '48px',
            fontStyle: 'Bold',
            color: '#FDF8F8',

        })
            .setOrigin(0.5, 0.9)

        // Отрисовываем изображения и текст
        this.add(this.normalImage)
        this.add(this.hoverImage)
        this.add(this.disableImage)
        this.add(this.text)

        // Скрываем не нужные состояния
        this.hoverImage.setVisible(false)
        this.disableImage.setVisible(false)

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
                this.soundClick.play()
            })

    }

}