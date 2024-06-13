import { setCurrentScene, setModuleScene } from '../../../redux/GameConfig/config.slice'
import { store } from '../../../redux/store'
import choiceMiniButton from '../../components/choiceMiniButton'

export default class PhoneOneChoice {

    // Определяем объекты класса
    private choiceMenu!: Phaser.GameObjects.Container
    private choiceMenu2!: Phaser.GameObjects.Container

    private choicePanel: Phaser.GameObjects.Graphics
    private choicePanel2: Phaser.GameObjects.Graphics

    private ButtonOne: choiceMiniButton
    private ButtonTwo: choiceMiniButton

    private ButtonOne2: choiceMiniButton
    private ButtonTwo2: choiceMiniButton
    private typingText2: Phaser.GameObjects.Text

    private scene: Phaser.Scene

    isVisible = false

    constructor(scene: Phaser.Scene) {

        this.scene = scene

        // Container one
        this.choiceMenu = scene.add.container(740, 640).setScale(0).setDepth(1)


        this.choicePanel = scene.add.graphics()
        this.choicePanel.fillStyle(0xffffff, 1)
        this.choicePanel.fillRoundedRect(0, 0, 384, 278, 24)

        this.ButtonOne = new choiceMiniButton(scene, 190, 90, 'СОГЛАСИТСЯ')
        this.ButtonTwo = new choiceMiniButton(scene, 190, 200, 'ОТКАЗАТЬСЯ')

        this.choiceMenu.add(this.choicePanel)
        this.choiceMenu.add(this.ButtonOne)
        this.choiceMenu.add(this.ButtonTwo)

        this.ButtonOne.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.Hide()
                store.dispatch(setModuleScene('onSuccess'))
            })

        this.ButtonTwo.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.Hide()
                this.panelTwoShow()
            })


        // Container two
        this.choiceMenu2 = scene.add.container(540, 440).setAlpha(0).setDepth(1)
        this.choicePanel2 = scene.add.graphics()
        this.choicePanel2.fillStyle(0xffffff, 1)
        this.choicePanel2.fillRoundedRect(0, 0, 684, 258, 24)

        this.typingText2 = scene.add.text(30, 42, 'Вы уверены?', {
            fontFamily: 'Manrope',
            fontSize: '28px',
            fontStyle: 'Bold',
            color: '#320064',

        })
            .setOrigin(0, 0)

        this.ButtonOne2 = new choiceMiniButton(scene, 180, 180, 'ДА')
        this.ButtonTwo2 = new choiceMiniButton(scene, 505, 180, '      Я ПОШУТИЛА\nКОНЕЧНО ВОЗЬМУ')

        this.choiceMenu2.add(this.choicePanel2)
        this.choiceMenu2.add(this.ButtonOne2)
        this.choiceMenu2.add(this.ButtonTwo2)
        this.choiceMenu2.add(this.typingText2)

        this.ButtonOne2.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.scene.cameras.main.fadeOut(500, 0, 0, 0, (_camera: any, progress: number) => {
                    if (progress === 1) {
                        store.dispatch(setCurrentScene('MainMenu'))
                        store.dispatch(setModuleScene(undefined))
                        this.scene.sound.removeAll()
                        this.scene.scene.start('MainMenu')
                    }
                })
            })
        this.ButtonTwo2.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.Show()
                this.panelTwoHide()
            })
    }


    Show() {
        if (this.isVisible) {
            return
        }

        this.scene.tweens.add({
            targets: this.choiceMenu,
            scaleX: 1,
            scaleY: 1,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })

        this.isVisible = true
    }

    Hide() {
        if (!this.isVisible) {
            return
        }

        this.scene.tweens.add({
            targets: this.choiceMenu,
            scaleX: 0,
            scaleY: 0,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })

        this.isVisible = false
    }

    private panelTwoShow() {
        this.scene.tweens.add({
            targets: this.choiceMenu2,
            alpha: 1,
            duration: 500,
            ease: Phaser.Math.Easing.Sine.InOut
        })
    }
    private panelTwoHide() {
        this.scene.tweens.add({
            targets: this.choiceMenu2,
            alpha: 0,
            duration: 500,
            ease: Phaser.Math.Easing.Sine.InOut
        })
    }
}