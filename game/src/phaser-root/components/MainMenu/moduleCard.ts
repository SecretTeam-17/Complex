import { UI } from '../../constants/assetConstants'
import { AUDIO } from '../../constants/audioConstant'


export default class ModuleCard extends Phaser.GameObjects.Container {

    // Определяем объекты класса
    container!: Phaser.GameObjects.Container
    private panel!: Phaser.GameObjects.Graphics

    private preImage: Phaser.GameObjects.Image
    private normalImage: Phaser.GameObjects.Image
    private disableImage: Phaser.GameObjects.Image
    hoverImage: Phaser.GameObjects.Image
    private buttonText: Phaser.GameObjects.Text

    private title: Phaser.GameObjects.Text
    private progress: Phaser.GameObjects.Graphics
    private bar: Phaser.GameObjects.Graphics
    private barText: Phaser.GameObjects.Text


    openSettings = false

    constructor(scene: Phaser.Scene, x: number, y: number, title: string, totalcounts: number, preimage: string, score: number, isAvailable: boolean) {

        super(scene, x, y)

        // Sound
        const Click = scene.sound.add(AUDIO.BUTTONCLICK)

        // Container
        this.container = scene.add.container(x, y).setScale(1).setDepth(2)
        this.panel = scene.add.graphics()
        this.panel.fillStyle(0xffffff, 1)
        this.panel.lineStyle(10, 0xC896FF, 1.0)
        this.panel.fillRoundedRect(0, 0, 410, 505, 32)
        this.panel.strokeRoundedRect(0, 0, 410, 505, 32)

        // Title
        this.title = scene.add.text(410 / 2, 30, title, {
            fontFamily: 'Manrope',
            fontSize: '30px',
            fontStyle: 'Bold',
            stroke: '#320064',
            strokeThickness: 1,
            color: '#320064',
        })
            .setOrigin(0.5, 0)

        // ProgressBar
        this.progress = scene.add.graphics()
        this.progress.fillStyle(0x63AC2E, 1)
        this.progress.fillRoundedRect(60, 80, 290, 30, 16)

        this.bar = scene.add.graphics()
        this.bar.fillStyle(0x49891A, 1)
        if (score / totalcounts < 0.1) {
            this.bar.fillRoundedRect(60, 80, (290) * 0.1, 30, 16)
        } else {
            this.bar.fillRoundedRect(60, 80, (290) * (score / totalcounts), 30, 16)
        }


        this.barText = scene.add.text(205, 95, '0/' + totalcounts + ' завершено', {
            fontFamily: 'Manrope',
            fontSize: '16px',
            fontStyle: 'Normal',
            color: '#FDF8F8',
        })
            .setOrigin(0.5, 0.5)

        // preImage
        this.preImage = scene.add.image(205, 370, preimage).setOrigin(0.5, 1).setScale(0.5)

        // Button
        this.normalImage = scene.add.image(205, 505 - 30, UI.ICONBUTTON.NORMAL).setOrigin(0.5, 1)
        this.hoverImage = scene.add.image(205, 505 - 30, UI.ICONBUTTON.HOVER).setOrigin(0.5, 1)
        this.disableImage = scene.add.image(205, 505 - 30, UI.ICONBUTTON.DISABLE).setOrigin(0.5, 1)

        this.buttonText = scene.add.text(205, 505 - 50, 'НАЧАТЬ', {
            fontFamily: 'Manrope',
            fontSize: '28px',
            fontStyle: 'Bold',
            color: '#FDF8F8',
        })
            .setOrigin(0.5, 1)


        // Добавляем элементы на экран
        this.container.add(this.panel)
        this.container.add(this.title)
        this.container.add(this.progress)
        this.container.add(this.bar)
        this.container.add(this.barText)
        this.container.add(this.preImage)
        this.container.add(this.hoverImage)
        this.container.add(this.normalImage)
        this.container.add(this.disableImage)
        this.container.add(this.buttonText)

        // Проверка доступности модуля
        if (!isAvailable) {
            this.normalImage.setAlpha(0)
            this.hoverImage.setAlpha(0)
        } else {
            this.disableImage.setAlpha(0)
        }

        // Определяем действия для кнопки по навыедению и нажатию
        this.normalImage.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.normalImage.setVisible(false)
                this.normalImage.disableInteractive()
                this.hoverImage.setInteractive()
                this.hoverImage.setVisible(true)
            })

        this.hoverImage.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.hoverImage.setVisible(false)
                this.hoverImage.disableInteractive()
                this.normalImage.setVisible(true)
                this.normalImage.setInteractive()

            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                Click.play()

            })
    }
}