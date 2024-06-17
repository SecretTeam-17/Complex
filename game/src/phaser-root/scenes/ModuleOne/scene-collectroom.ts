import Phaser from 'phaser'
import { setBag, setSavePoint, setScore } from '../../../redux/GameConfig/config.slice'
import { store } from '../../../redux/store'
import choiceMiniButton from '../../components/choiceMiniButton'
import inGameBag from '../../components/inGameBag'
import inGameBox from '../../components/inGameBox'
import { CONFIG } from '../../constants/gameConfig'
import { MOODULEONE } from '../../constants/moduleOneConstants'

export default class SceneCollectRoom extends Phaser.GameObjects.Container {
    background: Phaser.GameObjects.Image
    title: Phaser.GameObjects.Image
    progress: Phaser.GameObjects.Graphics
    bar: Phaser.GameObjects.Graphics
    score: number
    barText: Phaser.GameObjects.Text
    blank: Phaser.GameObjects.Image
    neck: Phaser.GameObjects.Image
    bone: Phaser.GameObjects.Image
    milk: Phaser.GameObjects.Image
    plain: Phaser.GameObjects.Image
    hat: Phaser.GameObjects.Image
    food: Phaser.GameObjects.Image
    misk: Phaser.GameObjects.Image
    photo: Phaser.GameObjects.Image
    bag: Phaser.GameObjects.Image
    Bag: inGameBag
    Box: inGameBox
    continueButton?: choiceMiniButton
    soundEffect?: Phaser.Sound.BaseSound
    currentScore: number

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.scene = scene
        this.score = 0
        const state = store.getState()
        this.currentScore = state.config.score

        // Инициализация фонa
        this.background = scene.add.image(0, 0, MOODULEONE.BACKGROUNDS.ROOMVIEWONE)
            .setOrigin(0, 0)
            .setScale(0.96)
            .setAlpha(1)
            .setDepth(0)

        scene.tweens.add({
            targets: this.background,
            alpha: 1,
            ease: 'Linear',
            duration: 1000
        })

        this.title = scene.add.image(CONFIG.SCREENWIDTH / 2, 220, MOODULEONE.COLLECTONE.title)
        this.add(this.background)
        this.add(this.title)

        // Icons
        this.Bag = new inGameBag(scene, CONFIG.SCREENWIDTH / 2 - 150, CONFIG.SCREENHIGHT - 135)
        this.Box = new inGameBox(scene, CONFIG.SCREENWIDTH / 2, CONFIG.SCREENHIGHT - 135)
        this.add(this.Bag.setDepth(1))
        this.add(this.Box.setDepth(1))

        // Objects
        this.blank = this.createDraggableObject(scene, 1686, 691, MOODULEONE.COLLECTONE.blank).setDepth(2)
        this.neck = this.createDraggableObject(scene, 1476, 972, MOODULEONE.COLLECTONE.neck).setDepth(2)
        this.bone = this.createDraggableObject(scene, 646, 705, MOODULEONE.COLLECTONE.bone).setDepth(2)
        this.milk = this.createDraggableObject(scene, 1626, 666, MOODULEONE.COLLECTONE.milk).setDepth(2)
        this.plain = this.createDraggableObject(scene, 1386, 577, MOODULEONE.COLLECTONE.plain).setDepth(2)
        this.hat = this.createDraggableObject(scene, 890, 615, MOODULEONE.COLLECTONE.hat).setDepth(2)
        this.food = this.createDraggableObject(scene, 110, 526, MOODULEONE.COLLECTONE.food).setDepth(2)
        this.misk = this.createDraggableObject(scene, 40, 984, MOODULEONE.COLLECTONE.misk).setDepth(2)
        this.photo = this.createDraggableObject(scene, 210, 312, MOODULEONE.COLLECTONE.photo).setDepth(2)
        this.bag = this.createDraggableObject(scene, 259, 784, MOODULEONE.COLLECTONE.bag).setDepth(2)

        // Добавить объекты в контейнер
        this.add(this.blank)
        this.add(this.neck)
        this.add(this.bone)
        this.add(this.milk)
        this.add(this.plain)
        this.add(this.hat)
        this.add(this.food)
        this.add(this.misk)
        this.add(this.photo)
        this.add(this.bag)

        // ProgressBar
        this.progress = scene.add.graphics()
        this.progress.fillStyle(0xffffff, 1)
        this.progress.fillRoundedRect(CONFIG.SCREENWIDTH / 2 + 70, 280, 128, 38, 16)
        this.add(this.progress)

        this.bar = scene.add.graphics()
        this.bar.fillStyle(0x49891A, 1)
        this.add(this.bar)
        this.updateProgressBar()

        this.barText = scene.add.text(CONFIG.SCREENWIDTH / 2 + 85, 335, this.score + '/10', {
            fontFamily: 'Manrope',
            fontSize: '20px',
            fontStyle: 'Bold',
            color: '#000',
        }).setOrigin(0.5, 0.5)
        this.add(this.barText)

        this.soundEffect = scene.sound.add(MOODULEONE.AUDIO.COMPLETE)
    }

    createDraggableObject(scene: Phaser.Scene, x: number, y: number, texture: string): Phaser.GameObjects.Image {
        const object = scene.add.image(x, y, texture).setOrigin(0, 0).setInteractive({ draggable: true })

        scene.input.setDraggable(object)

        object.on('dragstart', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            object.setTint(0xdddddd)
        })

        object.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            object.x = dragX
            object.y = dragY
        })

        object.on('dragend', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            object.clearTint()

            if (object.input) {
                const originalPosition = { x: object.input.dragStartX, y: object.input.dragStartY }
                // @ts-ignore
                if (this.isOverlapping(object, this.Box) && object !== this.blank) {
                    this.score += 1
                    this.updateProgressBar()
                    object.destroy()
                    // @ts-ignore
                } else if (object === this.blank && this.isOverlapping(object, this.Bag)) {
                    this.score += 1
                    this.updateProgressBar()
                    object.destroy()
                } else {
                    object.x = originalPosition.x
                    object.y = originalPosition.y
                }
            } else {
                console.error('Drag end event called but object input is null')
            }
        })

        return object
    }

    isOverlapping(object1: Phaser.GameObjects.Image, object2: Phaser.GameObjects.Image): boolean {
        const bounds1 = object1.getBounds()
        const bounds2 = object2.getBounds()

        return Phaser.Geom.Intersects.RectangleToRectangle(bounds1, bounds2)
    }

    updateProgressBar(): void {
        this.bar.clear()
        this.bar.fillStyle(0x63AC2E, 1)
        const fillPercentage = Math.max(this.score / 10, 0.2)
        this.bar.fillRoundedRect(CONFIG.SCREENWIDTH / 2 + 70, 280, (128) * fillPercentage, 38, 16)

        if (this.barText) {
            this.barText.setText(this.score + '/10')
        } else {
            console.error('barText is not defined')
        }

        if (this.score === 10) {
            this.soundEffect?.play()
            this.showContinueButton()
        }
    }

    showContinueButton(): void {
        this.continueButton = new choiceMiniButton(this.scene, CONFIG.SCREENWIDTH - 200, CONFIG.SCREENHIGHT - 75, 'ПРОДОЛЖИТЬ')
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.tweens.add({
                    targets: this.background,
                    alpha: 0,
                    ease: 'Linear',
                    duration: 1000
                })
                this.hideAllElements()
                store.dispatch(setBag(2))
                store.dispatch(setScore(7))
                store.dispatch(setSavePoint('HUB'))
            })
        this.add(this.continueButton)
    }

    hideAllElements(): void {
        this.each((child: Phaser.GameObjects.GameObject) => {
            if ('setVisible' in child) {
                (child as Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Visible).setVisible(false)
            }
        })
    }
}