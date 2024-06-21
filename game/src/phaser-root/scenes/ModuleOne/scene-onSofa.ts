import Phaser from 'phaser'
import { EventBus } from '../../EventBus'
import { CONFIG } from '../../constants/gameConfig'
import { MOODULEONE } from '../../constants/moduleOneConstants'

export default class SceneOnSofa extends Phaser.GameObjects.Container {
    private background: Phaser.GameObjects.Image
    private noteOne: Phaser.GameObjects.Image
    private noteTwo: Phaser.GameObjects.Image
    private noteThree: Phaser.GameObjects.Image
    private messageSound: Phaser.Sound.BaseSound
    private activeTweens: Phaser.Tweens.Tween[] = [];
    private activeTimers: Phaser.Time.TimerEvent[] = [];
    private playCount: number = 0;

    scene: Phaser.Scene

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        this.scene = scene

        // Инициализация и добавление фона
        this.background = this.createBackground(scene, MOODULEONE.BACKGROUNDS.ONSOFA)
        this.add(this.background)

        // Инициализация нот
        this.initializeNotes(scene)

        // Инициализация и воспроизведение звука
        this.messageSound = this.initializeMessageSound(scene)

        // Устанавливаем анимацию появления фона
        this.showBackground(() => {
            // Запуск анимации и звука с задержкой
            this.startAnimationWithDelay()
        })

        // Обработчик для события "phone-clicked"
        EventBus.on('phone-clicked', this.stopAnimation, this)

        // Привязка контекста методов
        this.cycleNotesAnimation = this.cycleNotesAnimation.bind(this)
        this.stopAnimation = this.stopAnimation.bind(this)
    }

    // Создание фона
    private createBackground(scene: Phaser.Scene, texture: string): Phaser.GameObjects.Image {
        return scene.add.image(0, 0, texture)
            .setOrigin(0, 0)
            .setScale(1)
            .setAlpha(0)
            .setDepth(0)
    }

    // Показ фона
    private showBackground(onComplete?: () => void) {
        if (!this.scene) return
        this.scene.tweens.add({
            targets: this.background,
            alpha: 1,
            ease: 'Linear',
            duration: 1000,
            onComplete: onComplete
        })
    }

    // Инициализация нот
    private initializeNotes(scene: Phaser.Scene) {
        this.noteOne = this.createNote(scene, CONFIG.SCREENWIDTH - 185, CONFIG.SCREENHIGHT - 220, 0.9, -0.5)
        this.noteTwo = this.createNote(scene, CONFIG.SCREENWIDTH - 145, CONFIG.SCREENHIGHT - 250, 0.7, -0.45)
        this.noteThree = this.createNote(scene, CONFIG.SCREENWIDTH - 100, CONFIG.SCREENHIGHT - 240, 1, 0)

        this.add(this.noteOne)
        this.add(this.noteTwo)
        this.add(this.noteThree)
    }

    // Создание ноты
    private createNote(scene: Phaser.Scene, x: number, y: number, scale: number, rotation: number): Phaser.GameObjects.Image {
        return scene.add.image(x, y, MOODULEONE.MINCUTE)
            .setScale(scale)
            .setRotation(rotation)
            .setAlpha(0)
    }

    // Инициализация звука сообщения
    private initializeMessageSound(scene: Phaser.Scene): Phaser.Sound.BaseSound {
        return scene.sound.add(MOODULEONE.AUDIO.MESSAGE).setVolume(0.2)
    }

    // Запуск анимации и звука с задержкой
    private startAnimationWithDelay() {
        this.scene.time.delayedCall(500, () => {
            this.cycleNotesAnimation()
            this.playSoundThreeTimes()
        }, [], this)
    }

    // Воспроизведение звука трижды
    private playSoundThreeTimes() {
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

    // Цикл анимации нот
    private cycleNotesAnimation() {
        const noteDuration = 900
        const delayBetweenNotes = 250

        const showNote = (note: Phaser.GameObjects.Image, delay: number) => {
            const timer = this.scene.time.delayedCall(delay, () => {
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
                onComplete: () => this.cycleNotesAnimation()
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

    // Остановка анимации
    private stopAnimation() {
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

    // Уничтожение объекта и удаление событий
    destroy(fromScene?: boolean) {
        EventBus.off('phone-clicked', this.stopAnimation, this)
        super.destroy(fromScene)
    }
}