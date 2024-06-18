import Phaser from 'phaser'
import { EventBus } from '../../EventBus'
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
    playCount: number = 0 // добавляем счетчик воспроизведений

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.scene = scene

        // Инициализация фона
        this.background = this.scene.add.image(0, 0, MOODULEONE.BACKGROUNDS.ONSOFA)
            .setOrigin(0, 0)
            .setScale(1)
            .setAlpha(0)
            .setDepth(0)

        this.scene.tweens.add({
            targets: this.background,
            alpha: 1,
            ease: 'Linear',
            duration: 1000
        })

        // Нотки
        this.noteOne = this.scene.add.image(CONFIG.SCREENWIDTH - 185, CONFIG.SCREENHIGHT - 220, MOODULEONE.MINCUTE)
            .setScale(0.9)
            .setRotation(-0.5)
            .setAlpha(0)
        this.noteTwo = this.scene.add.image(CONFIG.SCREENWIDTH - 145, CONFIG.SCREENHIGHT - 250, MOODULEONE.MINCUTE)
            .setScale(0.7)
            .setRotation(-0.45)
            .setAlpha(0)
        this.noteThree = this.scene.add.image(CONFIG.SCREENWIDTH - 100, CONFIG.SCREENHIGHT - 240, MOODULEONE.MINCUTE)
            .setAlpha(0)

        this.add(this.background)
        this.add(this.noteOne)
        this.add(this.noteTwo)
        this.add(this.noteThree)

        // Sound
        this.messageSound = this.scene.sound.add(MOODULEONE.AUDIO.MESSAGE).setVolume(0.2)

        this.scene.time.delayedCall(1000, () => {
            this.cycleNotesAnimation()
            this.playSoundThreeTimes()
        }, [], this)

        // Обработчик для события "phone-clicked"
        EventBus.on('phone-clicked', this.stopAnimation, this)

        // Привязка контекста
        this.cycleNotesAnimation = this.cycleNotesAnimation.bind(this)
        this.stopAnimation = this.stopAnimation.bind(this)
    }

    playSoundThreeTimes() {
        this.playCount = 0

        const onSoundComplete = () => {
            this.playCount++
            if (this.playCount < 3) {
                this.messageSound.play()
            } else {
                this.messageSound.off('complete', onSoundComplete)
            }
        }

        this.messageSound.on('complete', onSoundComplete)
        this.messageSound.play()
    }

    cycleNotesAnimation() {
        const noteDuration = 900
        const delayBetweenNotes = 250

        const showNote = (note: Phaser.GameObjects.Image, delay: number) => {
            const timer = this.scene?.time.delayedCall(delay, () => {
                if (!this.scene) return
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
            if (!this.scene) return
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
        const timer = this.scene?.time.delayedCall(3 * delayBetweenNotes + noteDuration, hideNotes)
        this.activeTimers.push(timer)
    }

    stopAnimation() {
        if (!this.scene) return
        // Останавливаем все текущие твины и удаляем таймеры
        this.activeTweens.forEach(tween => tween.stop())
        this.activeTimers.forEach(timer => timer.destroy())
        this.scene.tweens.add({
            targets: [this.noteOne, this.noteTwo, this.noteThree],
            alpha: 0,
            ease: 'Linear',
            duration: 1000
        })

        // Очищаем массивы активных твинов и таймеров
        this.activeTweens = []
        this.activeTimers = []
        if (this.messageSound.isPlaying) {
            this.messageSound.stop()
        }
    }

    destroy(fromScene?: boolean) {
        EventBus.off('phone-clicked', this.stopAnimation, this)
        super.destroy(fromScene)
    }
}