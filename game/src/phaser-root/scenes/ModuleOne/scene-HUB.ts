import Phaser from 'phaser'
import { setSavePoint } from '../../../redux/GameConfig/config.slice'
import { store } from '../../../redux/store'
import choiceMiniButton from '../../components/UI/choiceMiniButton'
import { CONFIG } from '../../constants/gameConfig'
import { MOODULEONE } from '../../constants/moduleOneConstants'

export default class sceneHUB extends Phaser.GameObjects.Container {
    background: Phaser.GameObjects.Image
    choiceMenu: Phaser.GameObjects.Container
    choicePanel: Phaser.GameObjects.Graphics
    typingText?: Phaser.GameObjects.Text
    ButtonOne?: choiceMiniButton
    ButtonTwo?: choiceMiniButton
    buttonText?: string
    currentScore: number
    ttypingText?: string
    currentPhone: number

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.scene = scene

        const state = store.getState()
        this.currentScore = state.config.score
        this.currentPhone = state.config.phone

        if (this.currentScore === 4 || this.currentScore === 10) {
            this.background = scene.add.image(0, 0, MOODULEONE.BACKGROUNDS.HUB)
                .setOrigin(0, 0)
                .setScale(1)
                .setAlpha(0)
                .setDepth(0)
        } else {
            this.background = scene.add.image(0, 0, MOODULEONE.BACKGROUNDS.ONSOFA)
                .setOrigin(0, 0)
                .setScale(1)
                .setAlpha(0)
                .setDepth(0)
        }
        this.add(this.background)

        scene.tweens.add({
            targets: this.background,
            alpha: 1,
            ease: 'Linear',
            duration: 1000
        })

        // Container
        this.choiceMenu = scene.add.container(75, CONFIG.SCREENHIGHT - 306).setAlpha(1).setDepth(5)
        this.add(this.choiceMenu)

        this.choicePanel = scene.add.graphics()
        this.choicePanel.fillStyle(0xffffff, 1)
        this.choicePanel.fillRoundedRect(0, 0, 684, 228, 24)

        this.ttypingText = 'Кажется, теперь всё на своих местах!\nЧто ещё сделать?'

        if (this.currentScore === 4) {
            this.ttypingText = 'С чего начнем?'
        } else if (this.currentScore === 10) {
            this.ttypingText = 'Нужна еда для собаки,стоит предупредить\nзаказчика. Осталось последнее дело...'
        }

        // Добавляем текст только после завершения блока с определением this.ttypingText
        this.typingText = scene.add.text(32, 32, this.ttypingText, {
            fontFamily: 'Comfortaa',
            fontSize: '24px',
            fontStyle: 'normal',
            color: '#320064',
        }).setOrigin(0, 0)

        // Определяем текст кнопок после блока условия this.currentPhone
        if (this.currentPhone === 2) {
            this.buttonText = 'ПОЗВОНИТЬ\nЗАКАЗЧИКУ'
        } else {
            this.buttonText = 'ОТДОХНУТЬ'
        }

        if (this.currentScore === 10) {
            this.buttonText = 'ПРОДОЛЖИТЬ'
        }

        this.ButtonOne = new choiceMiniButton(scene, 180, 150, this.buttonText)
        this.ButtonTwo = new choiceMiniButton(scene, 505, 150, 'ПОДГОТОВИТЬ\n     КВАРТИРУ')

        this.choiceMenu.add(this.choicePanel)
        this.choiceMenu.add(this.ButtonOne)
        this.choiceMenu.add(this.ButtonTwo)
        this.choiceMenu.add(this.typingText)

        if (this.currentScore === 10) {
            this.ButtonTwo.setAlpha(0)
        }

        this.ButtonOne.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                if (this.currentScore === 10) {
                    store.dispatch(setSavePoint('ToysGame'))
                } else {
                    if (this.buttonText === 'ОТДОХНУТЬ') {
                        if (this.currentScore === 4) {
                            store.dispatch(setSavePoint('CollectRoom'))
                        } else {
                            store.dispatch(setSavePoint('CollectRoom2'))
                        }
                    } else {
                        store.dispatch(setSavePoint('phoneTwo'))
                    }
                }
            })

        this.ButtonTwo.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                if (this.currentScore === 4) {
                    store.dispatch(setSavePoint('CollectRoom'))
                } else {
                    store.dispatch(setSavePoint('CollectRoom2'))
                }
            })
    }
}