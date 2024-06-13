import { UI } from '../../constants/assetConstants'
import { AUDIO } from '../../constants/audioConstant'


export default class ModuleCardMini extends Phaser.GameObjects.Container {

    // Определяем объекты класса
    container!: Phaser.GameObjects.Container
    panel: Phaser.GameObjects.Image
    private title: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene, x: number, y: number, text: string) {

        super(scene, x, y)

        // Sound
        const Click = scene.sound.add(AUDIO.BUTTONCLICK)

        // Container
        this.container = scene.add.container(x, y).setScale(1).setDepth(1)
        this.panel = scene.add.image(210, 0, UI.MINIMODULE).setOrigin(0.5, 0.5).setScale(1)
        this.container.add(this.panel.setRotation(1.5708))

        // Title
        this.title = scene.add.text(0, 0, text, {
            fontFamily: 'Manrope',
            fontSize: '28px',
            fontStyle: 'Bold',
            stroke: '#320064',
            strokeThickness: 0.5,
            color: '#320064',
        })
            .setOrigin(0, 0.5)

        // Добавляем элементы на экран
        this.container.add(this.panel)
        this.container.add(this.title)


        // Определяем действия для кнопки по навыедению и нажатию
        this.panel.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.panel.setScale(1.06)
            })

            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.panel.setScale(1)

            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                Click.play()
            })

    }
}