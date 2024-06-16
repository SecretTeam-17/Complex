import Phaser from 'phaser'
import { setSavePoint, setScore } from '../../../redux/GameConfig/config.slice'
import { store } from '../../../redux/store'
import inGameTextbox from '../../components/inGameTextbox'
import { MOODULEONE } from '../../constants/moduleOneConstants'

export default class sceneIntro extends Phaser.GameObjects.Container {
    roomTwo: Phaser.GameObjects.Image
    roomOne: Phaser.GameObjects.Image
    kitchen: Phaser.GameObjects.Image
    currentBackgroundIndex: number
    backgrounds: Phaser.GameObjects.Image[]
    textBox: inGameTextbox

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        scene.sound.add(MOODULEONE.AUDIO.KEYBOARD).setVolume(0.3).play()

        // Инициализация фонов
        this.roomTwo = scene.add.image(0, 0, MOODULEONE.BACKGROUNDS.ROOMVIEWONE)
            .setOrigin(0, 0)
            .setScale(0.96)
            .setAlpha(0)
            .setDepth(0)

        this.roomOne = scene.add.image(0, 0, MOODULEONE.BACKGROUNDS.ROOMVIEWTWO)
            .setOrigin(0, 0)
            .setScale(0.96)
            .setAlpha(0)
            .setDepth(0)

        this.kitchen = scene.add.image(0, 0, MOODULEONE.BACKGROUNDS.KITCHEN)
            .setOrigin(0, 0)
            .setScale(0.96)
            .setAlpha(0)
            .setDepth(0)

        // Массив фонов для переключения
        this.backgrounds = [this.roomTwo, this.kitchen, this.roomOne]
        this.currentBackgroundIndex = 0

        // Показать первый фон
        this.showBackground(this.currentBackgroundIndex, () => {
            // Запуск таймера для переключения фонов
            this.scheduleNextSwitch(scene)
        })

        this.textBox = new inGameTextbox(scene, 'В уютной комнате, сидя за моим компьютером\nя с нетерпением заполняю анкету на сайте Petsitter,\nпредвкушая, как начну делать то, что люблю, и найду\nработу мечты.')
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
                this.scene.time.delayedCall(3000, () => {
                    this.hideBackground(this.currentBackgroundIndex)
                    store.dispatch(setSavePoint('computer'))
                    store.dispatch(setScore(2))
                })
            } else {
                this.scheduleNextSwitch(this.scene)
            }
        })
    }
}
