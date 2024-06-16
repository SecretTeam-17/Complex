import Phaser from 'phaser'
import { setSavePoint, setScore } from '../../../redux/GameConfig/config.slice'
import { store } from '../../../redux/store'
import choiceMiniButton from '../../components/choiceMiniButton'
import inGameBox from '../../components/inGameBox'
import { CONFIG } from '../../constants/gameConfig'
import { MOODULEONE } from '../../constants/moduleOneConstants'

export default class sceneCollectKitchen extends Phaser.GameObjects.Container {
    background: Phaser.GameObjects.Image
    score: number
    currentScore: number
    continueButton?: choiceMiniButton
    soundEffect?: Phaser.Sound.BaseSound
    scissors: Phaser.GameObjects.Image
    Box: inGameBox
    food: Phaser.GameObjects.Image
    trash: Phaser.GameObjects.Image
    misk: Phaser.GameObjects.Image
    tabs: Phaser.GameObjects.Image
    shetka: Phaser.GameObjects.Image
    povodok: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.setDepth(3)

        this.scene = scene
        this.score = 0

        const state = store.getState()
        this.currentScore = state.config.score

        // Инициализация фонa
        this.background = scene.add.image(0, 0, MOODULEONE.BACKGROUNDS.KITCHEN)
            .setOrigin(0, 0)
            .setScale(0.96)
            .setAlpha(0)
            .setDepth(0)

        // Icons
        this.Box = new inGameBox(scene, CONFIG.SCREENWIDTH / 2, CONFIG.SCREENHIGHT - 135)

        scene.tweens.add({
            targets: [this.background, this.Box],
            alpha: 1,
            ease: 'Linear',
            duration: 1000
        })
        this.add(this.background)
        this.add(this.Box)

        // Objects
        this.food = this.createDraggableObject(scene, 168, 622, MOODULEONE.COLLECTONE.food)
        this.scissors = this.createDraggableObject(scene, 801, 600, MOODULEONE.COLLECTONE.scissors)
        this.trash = this.createDraggableObject(scene, 1179, 747, MOODULEONE.COLLECTONE.trash)
        this.misk = this.createDraggableObject(scene, 1356, 981, MOODULEONE.COLLECTONE.misk)
        this.tabs = this.createDraggableObject(scene, 1492, 682, MOODULEONE.COLLECTONE.tabs)
        this.shetka = this.createDraggableObject(scene, 1377, 765, MOODULEONE.COLLECTONE.shetka)
        this.povodok = this.createDraggableObject(scene, 1531, 840, MOODULEONE.COLLECTONE.povodok)

        // Добавить объекты в контейнер
        this.add(this.food.setDepth(10))
        this.add(this.scissors.setDepth(10))
        this.add(this.trash.setDepth(10))
        this.add(this.misk.setDepth(10))
        this.add(this.tabs.setDepth(10))
        this.add(this.shetka.setDepth(10))
        this.add(this.povodok.setDepth(10))

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
                if (this.isOverlapping(object, this.Box)) {
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
        if (this.score === 7) {
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
                store.dispatch(setScore(this.currentScore + 3))
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