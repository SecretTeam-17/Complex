import { CONFIG } from '../constants/gameConfig'

export default class InGameTextbox {
    // Определяем объекты класса
    textPanel: Phaser.GameObjects.Container
    private textbar: Phaser.GameObjects.Graphics
    private typingText: Phaser.GameObjects.Text
    private scene: Phaser.Scene

    constructor(scene: Phaser.Scene, text: string) {
        this.scene = scene

        // Создание панели текста
        this.textPanel = this.createTextPanel()

        // Создание текстового бара
        this.textbar = this.createTextbar()

        // Создание объекта для отображения текста
        this.typingText = this.createTypingText()

        // Добавление текстового бара и объекта текста в панель
        this.textPanel.add(this.textbar)
        this.textPanel.add(this.typingText)

        // Плавное появление TextPanel перед началом набора текста
        this.showTextPanel(text)
    }

    // Создание панели текста
    private createTextPanel(): Phaser.GameObjects.Container {
        return this.scene.add.container(75, CONFIG.SCREENHIGHT - 175).setScale(1).setAlpha(0)
    }

    // Создание текстового бара
    private createTextbar(): Phaser.GameObjects.Graphics {
        const textbar = this.scene.add.graphics()
        textbar.fillStyle(0xffffff, 1)
        textbar.fillRoundedRect(0, 0, 826, 158, 16)
        return textbar
    }

    // Создание объекта для отображения текста
    private createTypingText(): Phaser.GameObjects.Text {
        return this.scene.add.text(32, 28, '', {
            fontFamily: 'Comfortaa',
            fontSize: '24px',
            fontStyle: 'Bold',
            color: '#320064',
        }).setOrigin(0, 0)
    }

    // Плавное появление панели текста
    private showTextPanel(text: string) {
        this.scene.tweens.add({
            targets: this.textPanel,
            alpha: 1,
            duration: 1000,
            onComplete: () => {
                this.typewriteText(text)
            }
        })
    }

    // Анимация печати текста
    private typewriteText(text: string) {
        const length = text.length
        let i = 0

        this.scene.time.addEvent({
            callback: () => {
                this.typingText.text += text[i]
                i++
                if (i === length) {
                    this.hideTextPanel() // Скрытие панели после завершения анимации печати
                }
            },
            repeat: length - 1,
            delay: 50
        })
    }

    // Анимация печати текста с переносом строк
    public typewriteTextWrapped(text: string) {
        const lines = this.typingText.getWrappedText(text)
        const wrappedText = lines.join('\n')
        this.typewriteText(wrappedText)
    }

    // Плавное скрытие панели текста
    private hideTextPanel() {
        this.scene.tweens.add({
            targets: this.textPanel,
            alpha: 0,
            duration: 1500,
        })
    }
}