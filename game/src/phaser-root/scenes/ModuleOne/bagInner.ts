import Phaser from 'phaser'
import { store } from '../../../redux/store'
import choiceMiniButton from '../../components/UI/choiceMiniButton'
import { CONFIG } from '../../constants/gameConfig'
import { MOODULEONE } from '../../constants/moduleOneConstants'

export default class sceneBagInner extends Phaser.GameObjects.Container {
    background: Phaser.GameObjects.Image
    openBag: boolean = false;
    blankAnketa: Phaser.GameObjects.Image
    blankMemory: Phaser.GameObjects.Image
    ButtonOne: any
    ButtonTwo: choiceMiniButton

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.scene = scene

        // Инициализация фонa
        this.background = scene.add.image(0, 0, MOODULEONE.BACKGROUNDS.BAG)
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

        const InventaryImage = this.scene.add.image(400, CONFIG.SCREENHIGHT / 2, MOODULEONE.INVENTARY)
            .setAlpha(1)
            .setDepth(3)
        this.add(InventaryImage)

        this.blankAnketa = this.scene.add.image(1200, CONFIG.SCREENHIGHT / 2, MOODULEONE.LISTFULL)
        this.blankMemory = this.scene.add.image(1200, CONFIG.SCREENHIGHT / 2, MOODULEONE.LISTMEMORY)
        this.add(this.blankAnketa.setAlpha(0))
        this.add(this.blankMemory.setAlpha(0).setScale(1.25))

        this.ButtonOne = new choiceMiniButton(scene, 400, CONFIG.SCREENHIGHT / 2 - 50, 'АНКЕТА')
        this.ButtonTwo = new choiceMiniButton(scene, 400, CONFIG.SCREENHIGHT / 2 + 50, 'ПАМЯТКА')
        this.add(this.ButtonOne)
        this.add(this.ButtonTwo.setAlpha(0))

        this.ButtonOne.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.blankAnketa.setAlpha(1)
                this.blankMemory.setAlpha(0)

            })

        this.ButtonTwo.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.blankAnketa.setAlpha(0)
                this.blankMemory.setAlpha(1)

            })

    }

    // Показать меню
    bagShow() {
        if (this.openBag) return

        this.scene.tweens.add({
            targets: this,
            alpha: 1,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })
        this.checkBag()
        this.openBag = true
    }

    // Скрытие меню
    bagHide() {
        if (!this.openBag) return

        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })
        this.openBag = false
    }

    checkBag() {
        const state = store.getState()
        const bagIndex = state.config.bag
        if (bagIndex === 1) {
            this.ButtonTwo.setAlpha(0)
        } else {
            this.ButtonTwo.setAlpha(1)
        }
    }
}