import Phaser from 'phaser'
import { setSavePoint } from '../../../redux/GameConfig/config.slice'
import { store } from '../../../redux/store'
import choiceMiniButton from '../../components/UI/choiceMiniButton'
import { CONFIG } from '../../constants/gameConfig'
import { MOODULEONE } from '../../constants/moduleOneConstants'

export default class scenePhoneThree extends Phaser.GameObjects.Container {
    background: Phaser.GameObjects.Image
    ButtonOne: choiceMiniButton
    ButtonTwo: choiceMiniButton
    openPhone: boolean = false;
    isVisible: boolean
    choiceMenu: Phaser.GameObjects.Container
    choicePanel: Phaser.GameObjects.Graphics
    text: Phaser.GameObjects.Text
    choiceMenu2: Phaser.GameObjects.Container
    choicePanel2: Phaser.GameObjects.Graphics
    typingText: Phaser.GameObjects.Text
    ButtonOne2: choiceMiniButton
    ButtonTwo2: choiceMiniButton

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.scene = scene
        this.isVisible = true

        // Инициализация фонa
        this.background = scene.add.image(0, 0, MOODULEONE.BACKGROUNDS.PHONETWO)
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

        //Text
        this.text = this.scene.add.text(CONFIG.SCREENWIDTH / 2 - 30, 180, 'Марина заказчица', {
            fontFamily: 'Comfortaa',
            fontSize: '24px',
            fontStyle: 'Bold',
            color: '#000',
        }).setOrigin(0.5, 0.5)
            .setDepth(3)
        this.add(this.text)

        // Container one
        this.choiceMenu = scene.add.container(310, 740).setScale(1).setDepth(3)
        this.add(this.choiceMenu)

        this.choicePanel = scene.add.graphics()
        this.choicePanel.fillStyle(0xffffff, 1)
        this.choicePanel.fillRoundedRect(0, 0, 384, 170, 24)

        this.ButtonOne = new choiceMiniButton(scene, 190, 90, '       СООБЩИТЬ\nЧТО ВСЕ ГОТОВО')

        this.choiceMenu.add(this.choicePanel)
        this.choiceMenu.add(this.ButtonOne)

        this.ButtonOne.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.panelOneHide()
                this.panelTwoShow()
            })

        // Container two
        this.choiceMenu2 = scene.add.container(310, 740).setAlpha(0).setDepth(3)
        this.add(this.choiceMenu2)

        this.choicePanel2 = scene.add.graphics()
        this.choicePanel2.fillStyle(0xffffff, 1)
        this.choicePanel2.fillRoundedRect(0, 0, 684, 228, 24)

        this.typingText = scene.add.text(32, 42, 'Вы уверены, что все сделали?', {
            fontFamily: 'Comfortaa',
            fontSize: '28px',
            fontStyle: 'normal',
            color: '#320064',

        })
            .setOrigin(0, 0)

        this.ButtonOne2 = new choiceMiniButton(scene, 180, 150, 'ДА')
        this.ButtonTwo2 = new choiceMiniButton(scene, 505, 150, 'ЕЩЕ НЕ ВСЕ')

        this.choiceMenu2.add(this.choicePanel2)
        this.choiceMenu2.add(this.ButtonOne2)
        this.choiceMenu2.add(this.ButtonTwo2)
        this.choiceMenu2.add(this.typingText)

        this.ButtonOne2.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.phoneHide()
                store.dispatch(setSavePoint('ModuleOneEnd'))
            })
        this.ButtonTwo2.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.panelOneShow()
                this.panelTwoHide()
            })
    }

    panelOneShow() {
        if (this.isVisible) {
            return
        }

        this.scene.tweens.add({
            targets: this.choiceMenu,
            alpha: 1,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })

        this.isVisible = true
    }

    panelOneHide() {
        if (!this.isVisible) {
            return
        }

        this.scene.tweens.add({
            targets: this.choiceMenu,
            alpha: 0,
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

    // Показать меню
    phoneShow() {
        if (this.openPhone) return

        this.scene.tweens.add({
            targets: this,
            alpha: 1,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })
        this.openPhone = true
    }

    // Скрытие меню
    phoneHide() {
        if (!this.openPhone) return

        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })
        this.openPhone = false
    }
}