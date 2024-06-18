import Phaser from 'phaser'
import { setPhone, setSavePoint, setScore } from '../../../redux/GameConfig/config.slice'
import { store } from '../../../redux/store'
import choiceMiniButton from '../../components/UI/choiceMiniButton'
import { MOODULEONE } from '../../constants/moduleOneConstants'

export default class scenePhoneOne extends Phaser.GameObjects.Container {
    background: Phaser.GameObjects.Image
    noteOne: Phaser.GameObjects.Image
    noteTwo: Phaser.GameObjects.Image
    noteThree: Phaser.GameObjects.Image
    messageSound: Phaser.Sound.BaseSound
    choiceMenu: Phaser.GameObjects.Container
    choicePanel: Phaser.GameObjects.Graphics
    ButtonOne: choiceMiniButton
    ButtonTwo: choiceMiniButton
    choiceMenu2: Phaser.GameObjects.Container
    choicePanel2: Phaser.GameObjects.Graphics
    typingText2: Phaser.GameObjects.Text
    ButtonOne2: choiceMiniButton
    ButtonTwo2: choiceMiniButton

    isVisible: boolean

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.scene = scene

        // Инициализация фонa
        this.background = scene.add.image(0, 0, MOODULEONE.BACKGROUNDS.PHONEONE)
            .setOrigin(0, 0)
            .setScale(1)
            .setAlpha(0)
            .setDepth(0)

        scene.tweens.add({
            targets: this.background,
            alpha: 1,
            ease: 'Linear',
            duration: 1000
        })
        this.add(this.background)

        // Container one
        this.choiceMenu = scene.add.container(740, 640).setScale(0).setDepth(1)
        this.add(this.choiceMenu)

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
                scene.tweens.add({
                    targets: this.background,
                    alpha: 0,
                    ease: 'Linear',
                    duration: 1000
                })
                store.dispatch(setPhone(2))
                store.dispatch(setScore(4))
                store.dispatch(setSavePoint('HUB'))
            })

        this.ButtonTwo.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.Hide()
                this.panelTwoShow()
            })


        // Container two
        this.choiceMenu2 = scene.add.container(360, 530).setAlpha(0).setDepth(1)
        this.add(this.choiceMenu2)

        this.choicePanel2 = scene.add.graphics()
        this.choicePanel2.fillStyle(0xffffff, 1)
        this.choicePanel2.fillRoundedRect(0, 0, 684, 258, 24)

        this.typingText2 = scene.add.text(32, 42, 'Вы уверены?', {
            fontFamily: 'Manrope',
            fontSize: '24px',
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
                this.panelTwoHide()
                store.dispatch(setSavePoint('altEnd'))
            })
        this.ButtonTwo2.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.Show()
                this.panelTwoHide()
            })

        scene.time.delayedCall(1000, () => {
            this.Show()
        }, [], this)
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