import Phaser from 'phaser'
import { setSavePoint } from '../../../redux/GameConfig/config.slice'
import { store } from '../../../redux/store'
import choiceMiniButton from '../../components/choiceMiniButton'
import { CONFIG } from '../../constants/gameConfig'
import { MOODULEONE } from '../../constants/moduleOneConstants'

export default class sceneHUB extends Phaser.GameObjects.Container {
    background: Phaser.GameObjects.Image
    choiceMenu: Phaser.GameObjects.Container
    choicePanel: Phaser.GameObjects.Graphics
    typingText: Phaser.GameObjects.Text
    ButtonOne: choiceMiniButton
    ButtonTwo: choiceMiniButton
    buttonText: string
    currentScore: number
    ttypingText: string

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.scene = scene

        const state = store.getState()
        this.currentScore = state.config.score

        if (this.currentScore < 6) {
            this.background = scene.add.image(0, 0, MOODULEONE.BACKGROUNDS.HUB)
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
        } else {

            this.background = scene.add.image(0, 0, MOODULEONE.BACKGROUNDS.ONSOFA)
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

            if (this.currentScore === 10) {
                this.scene.time.delayedCall(1000, () => {
                    const baloon = this.scene.add.image(1350, 520, MOODULEONE.COLLECTONE.baloon1)
                    this.scene.add.existing(baloon.setDepth(5))
                    this.scene.time.delayedCall(2000, () => {
                        baloon.destroy()
                    }, [], this)
                }, [], this)
            }
        }
        this.add(this.background)

        // Container
        this.choiceMenu = scene.add.container(75, CONFIG.SCREENHIGHT - 306).setAlpha(1).setDepth(1)
        this.add(this.choiceMenu)
        this.choicePanel = scene.add.graphics()
        this.choicePanel.fillStyle(0xffffff, 1)
        this.choicePanel.fillRoundedRect(0, 0, 684, 228, 24)

        if (this.currentScore < 7) {
            this.ttypingText = 'С чего начнем?'
        } else {
            this.ttypingText = 'Что дальше?'
        }

        this.typingText = scene.add.text(32, 42, this.ttypingText, {
            fontFamily: 'Comfortaa',
            fontSize: '28px',
            fontStyle: 'normal',
            color: '#320064',

        })
            .setOrigin(0, 0)

        if (this.currentScore < 10) {
            this.buttonText = 'ПОЗВОНИТЬ\nЗАКАЗЧИКУ'
        } else {
            this.buttonText = 'ОТДОХНУТЬ'
        }

        this.ButtonOne = new choiceMiniButton(scene, 180, 150, this.buttonText)

        this.ButtonTwo = new choiceMiniButton(scene, 505, 150, 'ПОДГОТОВИТЬ\n     КВАРТИРУ')

        this.choiceMenu.add(this.choicePanel)
        this.choiceMenu.add(this.ButtonOne)
        this.choiceMenu.add(this.ButtonTwo)
        this.choiceMenu.add(this.typingText)

        this.ButtonOne.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                if (this.buttonText === 'ОТДОХНУТЬ') {
                    if (this.currentScore < 10) {
                        store.dispatch(setSavePoint('CollectRoom'))
                    } else {
                        store.dispatch(setSavePoint('CollectRoom2'))
                    }
                } else {
                    store.dispatch(setSavePoint('phoneTwo'))
                }
            })
        this.ButtonTwo.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                if (this.currentScore < 10) {
                    if (this.currentScore === 7) {
                        store.dispatch(setSavePoint('CollectRoom2'))
                    } else {
                        store.dispatch(setSavePoint('CollectRoom'))
                    }
                } else {
                    store.dispatch(setSavePoint('CollectRoom2'))
                }
            })
    }
}

