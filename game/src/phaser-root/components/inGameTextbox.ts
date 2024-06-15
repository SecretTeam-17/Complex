import { CONFIG } from '../constants/gameConfig'

export default class inGameTextbox {

    // Определяем объекты класса
    TextPanel!: Phaser.GameObjects.Container
    private textbar: Phaser.GameObjects.Graphics
    private typingText: Phaser.GameObjects.Text

    public text: string
    scene: Phaser.Scene


    constructor(scene: Phaser.Scene, text: string) {

        this.scene = scene

        this.TextPanel = scene.add.container(75, CONFIG.SCREENHIGHT - 175).setScale(1).setAlpha(0)

        this.textbar = scene.add.graphics()
        this.textbar.fillStyle(0xffffff, 1)
        this.textbar.fillRoundedRect(0, 0, 826, 158, 16)

        this.typingText = scene.add.text(32, 28, '', {
            fontFamily: 'Comfortaa',
            fontSize: '24px',
            fontStyle: 'Bold',
            color: '#320064',

        })
            .setOrigin(0, 0)

        // Отрисовываем изображения и текст
        this.TextPanel.add(this.textbar)
        this.TextPanel.add(this.typingText)

        // Плавное появление TextPanel перед началом набора текста
        this.showTextPanel(scene, text)
    }

    showTextPanel(scene: Phaser.Scene, text: string) {
        scene.tweens.add({
            targets: this.TextPanel,
            alpha: 1,
            duration: 1000,
            onComplete: () => {
                this.typewriteText(scene, text)
            }
        })
    }




    typewriteText(scene: Phaser.Scene, text: string) {
        const length = text.length
        let i = 0
        scene.time.addEvent({
            callback: () => {
                this.typingText.text += text[i]
                ++i
                if (i === length) {
                    this.hide() // Вызов hide после завершения анимации
                }
            },
            repeat: length - 1,
            delay: 50
        })
    }
    typewriteTextWrapped(scene: Phaser.Scene, text: string) {
        const lines = this.typingText.getWrappedText(text)
        const wrappedText = lines.join('\n')

        this.typewriteText(scene, wrappedText)
    }

    hide() {
        this.scene.tweens.add({
            targets: this.TextPanel,
            alpha: 0,
            duration: 1500,
        })
    }
}