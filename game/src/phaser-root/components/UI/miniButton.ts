import Phaser from 'phaser'
import { AUDIO, UI } from '../../constants/assetConstants'

export default class customMiniButton extends Phaser.GameObjects.Container {

    // Определяем объекты контейнера
    normalImage: Phaser.GameObjects.Image
    hoverImage: Phaser.GameObjects.Image
    private soundClick: Phaser.Sound.BaseSound
    private text: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene, x: number, y: number, text: string) {
        super(scene, x, y)


        // Инициализация звука нажатия кнопки
        this.soundClick = scene.sound.add(AUDIO.BUTTONCLICK)

        // Создание и добавление элементов UI в контейнер
        this.normalImage = scene.add.image(0, 0, UI.ICONBUTTON.NORMAL).setScale(0.85)
        this.hoverImage = scene.add.image(0, 0, UI.ICONBUTTON.HOVER).setScale(0.85)
        this.text = scene.add.text(0, 0, text, {
            fontFamily: 'Manrope',
            fontSize: '28px',
            fontStyle: 'Bold',
            color: '#FDF8F8',
        })
            .setOrigin(0.5, 0.5)

        // Добавление элементов в контейнер
        this.add(this.normalImage)
        this.add(this.hoverImage)
        this.add(this.text)

        // Скрываем не нужные состояния
        this.hoverImage.setVisible(false)
        this.setSize(this.normalImage.width, this.normalImage.height)

        // Настройка интерактивного поведения кнопки
        this.configureButtonInteractions()
    }

    // Конфигурация интерактивного поведения кнопки
    private configureButtonInteractions() {
        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, this.handlePointerOver.bind(this))
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, this.handlePointerOut.bind(this))
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.handlePointerUp.bind(this))
    }

    // Обработчик события наведения на кнопку
    private handlePointerOver() {
        this.normalImage.setVisible(false)
        this.hoverImage.setVisible(true)
    }

    // Обработчик события убирания курсора с кнопки
    private handlePointerOut() {
        this.normalImage.setVisible(true)
        this.hoverImage.setVisible(false)
    }

    // Обработчик события нажатия на кнопку
    private handlePointerUp() {
        this.soundClick.play()
    }
}