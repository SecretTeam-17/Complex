import Phaser from 'phaser'
import { MOODULEONE } from '../../constants/moduleOneConstants'

export default class sceneOnSofa extends Phaser.GameObjects.Container {
    background: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        // Инициализация фонов
        this.background = scene.add.image(0, 0, MOODULEONE.BACKGROUNDS.ONSOFA)
            .setOrigin(0, 0)
            .setScale(1)
            .setAlpha(-1)
            .setDepth(0)

        scene.tweens.add({
            targets: this.background,
            alpha: 1,
            ease: 'Linear',
            duration: 1500
        })
    }
}