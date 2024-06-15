import Phaser from 'phaser'
import { CONFIG } from '../../constants/gameConfig'
import { MOODULEONE } from '../../constants/moduleOneConstants'

export default class sceneOnSofa extends Phaser.GameObjects.Container {
    background: Phaser.GameObjects.Image
    noteOne: Phaser.GameObjects.Image
    noteTwo: Phaser.GameObjects.Image
    noteThree: Phaser.GameObjects.Image
    messageSound: Phaser.Sound.BaseSound
    activeTweens: Phaser.Tweens.Tween[] = []
    activeTimers: Phaser.Time.TimerEvent[] = []

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.scene = scene

        // Инициализация фонa
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

        // Нотки
        this.noteOne = scene.add.image(CONFIG.SCREENWIDTH - 185, CONFIG.SCREENHIGHT - 220, MOODULEONE.MINCUTE).setScale(0.9).setRotation(-0.5).setAlpha(0)
        this.noteTwo = scene.add.image(CONFIG.SCREENWIDTH - 145, CONFIG.SCREENHIGHT - 250, MOODULEONE.MINCUTE).setScale(0.7).setRotation(-0.45).setAlpha(0)
        this.noteThree = scene.add.image(CONFIG.SCREENWIDTH - 100, CONFIG.SCREENHIGHT - 240, MOODULEONE.MINCUTE).setAlpha(0)

        // Sound
        this.messageSound = scene.sound.add(MOODULEONE.AUDIO.MESSAGE).setVolume(0.2)

        scene.time.delayedCall(1000, () => {
            this.cycleNotesAnimation()
            this.messageSound.play({ loop: true })
        }, [], this)

        // Добавляем обработчик клика
        scene.input.on('pointerdown', this.stopAnimation, this)
    }

    cycleNotesAnimation() {
        const noteDuration = 900
        const delayBetweenNotes = 250

        const showNote = (note: Phaser.GameObjects.Image, delay: number) => {
            const timer = this.scene.time.delayedCall(delay, () => {
                const tween = this.scene.tweens.add({
                    targets: note,
                    alpha: 1,
                    duration: noteDuration,
                    ease: 'Linear'
                })
                this.activeTweens.push(tween)
            })
            this.activeTimers.push(timer)
        }

        const hideNotes = () => {
            const tween = this.scene.tweens.add({
                targets: [this.noteOne, this.noteTwo, this.noteThree],
                alpha: 0,
                duration: noteDuration,
                ease: 'Linear',
                onComplete: () => {
                    // Запуск анимации снова
                    this.cycleNotesAnimation()
                }
            })
            this.activeTweens.push(tween)
        }

        // Анимация появления нот по очереди
        showNote(this.noteOne, 0)
        showNote(this.noteTwo, delayBetweenNotes)
        showNote(this.noteThree, 2 * delayBetweenNotes)

        // Исчезновение всех нот после анимации появления
        const timer = this.scene.time.delayedCall(3 * delayBetweenNotes + noteDuration, hideNotes)
        this.activeTimers.push(timer)
    }

    stopAnimation() {
        // Останавливаем все текущие твины и удаляем таймеры
        this.activeTweens.forEach(tween => tween.stop())
        this.activeTimers.forEach(timer => timer.destroy())

        // Очищаем массивы активных твинов и таймеров
        this.activeTweens = []
        this.activeTimers = []
        if (this.messageSound.isPlaying) {
            this.messageSound.stop()
        }
    }
}