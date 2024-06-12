import { CONFIG } from '../constants/gameConfig'

export default class inGameTextbox {

    // Определяем объекты класса
    private TextPanel!: Phaser.GameObjects.Container
    private textbar: Phaser.GameObjects.Graphics
    private typingText: Phaser.GameObjects.Text

    public text: string


    constructor(scene: Phaser.Scene, text: string) {

        const { width } = scene.scale

        this.TextPanel = scene.add.container(100, CONFIG.SCREENHIGHT - 175).setScale(1).setDepth(1)

        this.textbar = scene.add.graphics()
        this.textbar.fillStyle(0xffffff, 1)
        this.textbar.fillRoundedRect(0, 0, 500, 100, 16)

        this.typingText = scene.add.text(10, 32, '', {
            fontFamily: 'Manrope',
            fontSize: '24px',
            fontStyle: 'Bold',
            color: '#320064',

        })
            .setOrigin(0, 0)

        this.typewriteText(scene, text)

        // Отрисовываем изображения и текст
        this.TextPanel.add(this.textbar)
        this.TextPanel.add(this.typingText)

    }
    destroy() {
        this.TextPanel.destroy()
    }


    typewriteText(scene: Phaser.Scene, text: string) {
        const length = text.length
        let i = 0
        scene.time.addEvent({
            callback: () => {
                this.typingText.text += text[i]
                ++i
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
}