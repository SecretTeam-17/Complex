import Phaser from 'phaser'
import { setSavePoint, setScore } from '../../../redux/GameConfig/config.slice'
import { store } from '../../../redux/store'
import InGameTextbox from '../../components/inGameTextbox'
import { MOODULEONE } from '../../constants/moduleOneConstants'

export default class SceneIntro extends Phaser.GameObjects.Container {
    private roomTwo: Phaser.GameObjects.Image
    private roomOne: Phaser.GameObjects.Image
    private kitchen: Phaser.GameObjects.Image
    private currentBackgroundIndex: number
    private backgrounds: Phaser.GameObjects.Image[]
    private textBox: InGameTextbox

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        // Воспроизведение звук нажатия клавиш
        scene.sound.add(MOODULEONE.AUDIO.KEYBOARD).setVolume(0.3).play()

        // Инициализация фонов
        this.roomTwo = this.createBackground(scene, MOODULEONE.BACKGROUNDS.ROOMVIEWONE)
        this.roomOne = this.createBackground(scene, MOODULEONE.BACKGROUNDS.ROOMVIEWTWO)
        this.kitchen = this.createBackground(scene, MOODULEONE.BACKGROUNDS.KITCHEN)

        // Массив фонов для переключения
        this.backgrounds = [this.roomTwo, this.kitchen, this.roomOne]
        this.currentBackgroundIndex = 0

        // Показать первый фон
        this.showBackground(this.currentBackgroundIndex, () => {
            // Запуск таймера для переключения фонов
            this.scheduleNextSwitch(scene)
        })

        // Инициализация текстового поля
        this.textBox = new InGameTextbox(scene, 'В уютной комнате, сидя за моим компьютером\nя заполняю анкету на сайте Petsitter, предвкушая, как\nначну делать то, что люблю, и найду работу мечты.')

        // Добавление объектов в контейнер
        this.add(this.roomTwo)
        this.add(this.roomOne)
        this.add(this.kitchen)
        this.add(this.textBox.textPanel)
    }

    // Создание фона
    private createBackground(scene: Phaser.Scene, texture: string): Phaser.GameObjects.Image {
        return scene.add.image(0, 0, texture)
            .setOrigin(0, 0)
            .setScale(0.96)
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
    private scheduleNextSwitch(scene: Phaser.Scene) {
        if (this.currentBackgroundIndex < this.backgrounds.length - 1) {
            scene.time.addEvent({
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