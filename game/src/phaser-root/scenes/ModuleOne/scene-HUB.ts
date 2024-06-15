import Phaser from 'phaser'
import { setPhone, setSavePoint } from '../../../redux/GameConfig/config.slice'
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

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.scene = scene

        // Инициализация фонa
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

        // Container
        this.choiceMenu = scene.add.container(75, CONFIG.SCREENHIGHT - 306).setAlpha(1).setDepth(1)
        this.choicePanel = scene.add.graphics()
        this.choicePanel.fillStyle(0xffffff, 1)
        this.choicePanel.fillRoundedRect(0, 0, 684, 228, 24)

        this.typingText = scene.add.text(32, 42, 'С чего начнем?', {
            fontFamily: 'Comfortaa',
            fontSize: '28px',
            fontStyle: 'normal',
            color: '#320064',

        })
            .setOrigin(0, 0)

        const state = store.getState()
        const phoneIndex = state.config.phone
        if (phoneIndex === 2) {
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
                if(this.buttonText  ===  'ОТДОХНУТЬ')  {} else {
                store.dispatch(setPhone(0))
                store.dispatch(setSavePoint('phoneTwo'))}
            })
        this.ButtonTwo.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
            })

    }
}