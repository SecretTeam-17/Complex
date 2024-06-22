import Phaser from 'phaser'
import { setPhone, setSavePoint, setScore } from '../../../redux/GameConfig/config.slice'
import { store } from '../../../redux/store'
import InGameTextbox from '../../components/inGameTextbox'
import { MOODULEONE } from '../../constants/moduleOneConstants'

export default class SceneComputer extends Phaser.GameObjects.Container {
    private currentBackgroundIndex: number
    private backgrounds: Phaser.GameObjects.Image[]
    private textBox: InGameTextbox
    private bgOne: Phaser.GameObjects.Image
    private bgTwo: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        // Инициализация сцены
        this.scene = scene

        // Воспроизведение звук нажатия клавиш
        scene.sound.add(MOODULEONE.AUDIO.KEYBOARD).play()

        // Инициализация фонов
        this.bgOne = this.createBackground(scene, MOODULEONE.BACKGROUNDS.COMPUTER1)
        this.bgTwo = this.createBackground(scene, MOODULEONE.BACKGROUNDS.COMPUTER2)

        // Массив фонов для переключения
        this.backgrounds = [this.bgOne, this.bgTwo]
        this.currentBackgroundIndex = 0

        // Показать первый фон
        this.showBackground(this.currentBackgroundIndex, () => {
            // Запуск таймера для переключения фонов
            this.scheduleNextSwitch()
        })

        // Инициализация текстового поля
        this.textBox = new InGameTextbox(scene, 'Я готова встретить будущее с распростертыми\nобъятиями, ведь оно сулит интересные приключения и\nисполнение мечты.')

        // Добавление объектов в контейнер
        this.add(this.bgOne)
        this.add(this.bgTwo)
        this.add(this.textBox.textPanel)
    }

    // Создание заднего фона
    private createBackground(scene: Phaser.Scene, texture: string): Phaser.GameObjects.Image {
        return scene.add.image(0, 0, texture)
            .setOrigin(0, 0)
            .setScale(1)
            .setAlpha(0)
            .setDepth(0)
    }

    // Показ фона
    private showBackground(index: number, onComplete?: () => void) {
        const background = this.backgrounds[index]
        this.scene.tweens.add({
            targets: background,
            alpha: 1,
            duration: 1000,
            onComplete: onComplete
        })
    }

    // Скрытие фона
    private hideBackground(index: number, onComplete?: () => void) {
        const background = this.backgrounds[index]
        this.scene.tweens.add({
            targets: background,
            alpha: 0,
            duration: 1000,
            onComplete: onComplete
        })
    }

    // Запланировать следующее переключение фона
    private scheduleNextSwitch() {
        if (this.currentBackgroundIndex < this.backgrounds.length - 1) {
            this.scene.time.addEvent({
                delay: 2000,
                callback: this.switchBackground,
                callbackScope: this
            })
        }
    }

    // Переключение фона
    private switchBackground() {
        const previousIndex = this.currentBackgroundIndex
        this.currentBackgroundIndex++

        this.showBackground(this.currentBackgroundIndex)
        this.hideBackground(previousIndex, () => {
            if (this.currentBackgroundIndex === this.backgrounds.length - 1) {
                // Выполнить действия после завершения всех анимаций
                this.scene.time.delayedCall(5000, () => {
                    this.hideBackground(this.currentBackgroundIndex)
                    store.dispatch(setSavePoint('onSofa'))
                    store.dispatch(setScore(3))
                    store.dispatch(setPhone(1))
                })
            } else {
                this.scheduleNextSwitch()
            }
        })
    }
}