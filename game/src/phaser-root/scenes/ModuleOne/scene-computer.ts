import Phaser from 'phaser'
import { setPhone, setSavePoint, setScore } from '../../../redux/GameConfig/config.slice'
import { store } from '../../../redux/store'
import inGameTextbox from '../../components/inGameTextbox'
import { MOODULEONE } from '../../constants/moduleOneConstants'

export default class sceneComputer extends Phaser.GameObjects.Container {
    currentBackgroundIndex: number
    backgrounds: Phaser.GameObjects.Image[]
    textBox: inGameTextbox
    bgOne: Phaser.GameObjects.Image
    bgTwo: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        this.scene = scene

        scene.sound.add(MOODULEONE.AUDIO.KEYBOARD).play()

        // Инициализация фонов
        this.bgOne = scene.add.image(0, 0, MOODULEONE.BACKGROUNDS.COMPUTER1)
            .setOrigin(0, 0)
            .setScale(1)
            .setAlpha(0)
            .setDepth(0)

        this.bgTwo = scene.add.image(0, 0, MOODULEONE.BACKGROUNDS.COMPUTER2)
            .setOrigin(0, 0)
            .setScale(1)
            .setAlpha(0)
            .setDepth(0)

        // Массив фонов для переключения
        this.backgrounds = [this.bgOne, this.bgTwo]
        this.currentBackgroundIndex = 0

        // Показать первый фон
        this.showBackground(this.currentBackgroundIndex, () => {
            // Запуск таймера для переключения фонов
            this.scheduleNextSwitch(scene)
        })

        this.textBox = new inGameTextbox(scene, 'Я готова встретить будущее с распростертыми\nобъятиями, ведь оно сулит интересные приключения и\nисполнение мечты.')
    }

    showBackground(index: number, onComplete?: () => void) {
        const background = this.backgrounds[index]
        this.scene.tweens.add({
            targets: background,
            alpha: 1,
            duration: 1000,
            onComplete: onComplete
        })
    }

    hideBackground(index: number, onComplete?: () => void) {
        const background = this.backgrounds[index]
        this.scene.tweens.add({
            targets: background,
            alpha: 0,
            duration: 1000,
            onComplete: onComplete
        })
    }

    scheduleNextSwitch(scene: Phaser.Scene) {
        if (this.currentBackgroundIndex < this.backgrounds.length - 1) {
            scene.time.addEvent({
                delay: 2000,
                callback: this.switchBackground,
                callbackScope: this
            })
        }
    }

    switchBackground() {
        const previousIndex = this.currentBackgroundIndex
        this.currentBackgroundIndex++

        this.showBackground(this.currentBackgroundIndex)
        this.hideBackground(previousIndex, () => {
            if (this.currentBackgroundIndex === this.backgrounds.length - 1) {
                // Выполнить действия после завершения всех анимаций
                this.scene.time.delayedCall(5000, () => {
                    this.scene.tweens.add({
                        targets: this.bgTwo,
                        alpha: 0,
                        duration: 1000
                    })
                    store.dispatch(setSavePoint('onSofa'))
                    store.dispatch(setScore(3))
                    store.dispatch(setPhone(1))
                })
            } else {
                this.scheduleNextSwitch(this.scene)
            }
        })
    }
}
