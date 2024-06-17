import Phaser from 'phaser'
import { setBag, setCurrentScene, setPhone, setSavePoint } from '../../../redux/GameConfig/config.slice'
import { store } from '../../../redux/store'
import choiceMiniButton from '../../components/UI/choiceMiniButton'
import mascotDog from '../../components/UI/mascotDog'
import { INGAMEUI, UI } from '../../constants/assetConstants'
import { CONFIG } from '../../constants/gameConfig'
import { MOODULEONE } from '../../constants/moduleOneConstants'

export default class sceneEnd extends Phaser.GameObjects.Container {
    background: Phaser.GameObjects.Image
    Dog: any
    baloon: Phaser.GameObjects.Container
    text1: Phaser.GameObjects.Text
    text2: Phaser.GameObjects.Text
    Button: choiceMiniButton
    baloonIcon: Phaser.GameObjects.Image
    logo: Phaser.GameObjects.Image
    scene: Phaser.Scene
    star1: Phaser.GameObjects.Image
    star3: Phaser.GameObjects.Image
    star2: Phaser.GameObjects.Image
    currentScore: number
    typpingText: string
    typpingText2: string


    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.scene = scene

        const state = store.getState()
        this.currentScore = state.config.score

        // Sound
        const end = scene.sound.add(MOODULEONE.AUDIO.COMPLETE)

        // Инициализация фонa
        this.background = scene.add.image(0, 0, MOODULEONE.BACKGROUNDS.ROOMVIEWTWO)
            .setOrigin(0, 0)
            .setScale(0.96)
            .setAlpha(0)
            .setDepth(0)

        scene.tweens.add({
            targets: this.background,
            alpha: 1,
            ease: 'Linear',
            duration: 1000
        })

        //Добавляем лого
        this.logo = scene.add.image(75, 45, UI.MAINLOGO).setOrigin(0, 0)

        // Добавляем маскотов
        this.Dog = new mascotDog(scene, CONFIG.SCREENWIDTH - 440, CONFIG.SCREENHIGHT - 280).setScale(1.6).setAlpha(1)

        this.add(this.background)
        this.add(this.logo)
        this.add(this.Dog)

        // Container
        this.baloon = scene.add.container(653, 174).setAlpha(0).setDepth(1)
        this.add(this.baloon)

        this.baloonIcon = scene.add.image(0, 0, MOODULEONE.BALOON).setOrigin(0, 0)



        if (this.currentScore === 15) {
            this.typpingText = 'Поздравляю!'
            this.typpingText2 = 'Вы отлично подготовились к новому\nсожителю!'
        } else {
            this.typpingText = 'Интересно ...'
            this.typpingText2 = 'Вы немного не подготовились к новому\nсожителю!'
        }

        this.text1 = scene.add.text(60, 60, this.typpingText, {
            fontFamily: 'Manrope',
            fontSize: '58px',
            fontStyle: 'Bold',
            color: '#320064',

        })
            .setOrigin(0, 0)

        this.text2 = scene.add.text(60, 180, this.typpingText2, {
            fontFamily: 'Manrope',
            fontSize: '24px',
            fontStyle: 'Bold',
            color: '#320064',

        })
            .setOrigin(0, 0)

        this.Button = new choiceMiniButton(scene, 205, 335, 'К МОДУЛЮ 2')
        this.star1 = scene.add.image(this.baloonIcon.width / 2 - 60, 0, INGAMEUI.STAR)
        this.star2 = scene.add.image(this.baloonIcon.width / 2, 0, INGAMEUI.STAR)
        this.star3 = scene.add.image(this.baloonIcon.width / 2 + 60, 0, INGAMEUI.STAR)

        this.baloon.add(this.baloonIcon)
        this.baloon.add(this.text1)
        this.baloon.add(this.text2)
        this.baloon.add(this.Button)
        this.baloon.add(this.star1)
        this.baloon.add(this.star2)
        this.baloon.add(this.star3)

        this.Button.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
            this.scene.cameras.main.fadeOut(500, 0, 0, 0, (_camera: any, progress: number) => {
                if (progress === 1) {
                    if (this.scene) {
                        this.scene.sound.removeAll()
                        this.scene.scene.start('MainMenu')
                        store.dispatch(setCurrentScene('MainMenu'))
                        store.dispatch(setSavePoint('intro'))
                        store.dispatch(setPhone(0))
                        store.dispatch(setBag(0))
                    } else {
                        console.error("Scene is undefined")
                    }
                }
            })
        })

        scene.time.delayedCall(1000, () => {
            end.play()
            this.Show()

        }, [], this)
    }

    Show() {
        this.scene.tweens.add({
            targets: this.baloon,
            alpha: 1,
            duration: 500,
            ease: Phaser.Math.Easing.Sine.InOut
        })
    }
}