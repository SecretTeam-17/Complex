import Phaser from 'phaser'
import { setSavePoint, setScore } from '../../../redux/GameConfig/config.slice'
import { store } from '../../../redux/store'
import choiceMiniButton from '../../components/UI/choiceMiniButton'
import { CONFIG } from '../../constants/gameConfig'
import { MOODULEONE } from '../../constants/moduleOneConstants'

interface ToyTextMap {
    icon: Phaser.GameObjects.Image
    text: Phaser.GameObjects.Image
    matched: boolean
}

export default class sceneToysGame extends Phaser.GameObjects.Container {
    background: Phaser.GameObjects.Image
    title: Phaser.GameObjects.Image
    frisbitext: Phaser.GameObjects.Image
    vorottext: Phaser.GameObjects.Image
    toytext: Phaser.GameObjects.Image
    cunttext: Phaser.GameObjects.Image
    kongtext: Phaser.GameObjects.Image
    frisbiicon: Phaser.GameObjects.Image
    voroticon: Phaser.GameObjects.Image
    toyicon: Phaser.GameObjects.Image
    cunticon: Phaser.GameObjects.Image
    kongicon: Phaser.GameObjects.Image
    soundEffect?: Phaser.Sound.BaseSound
    toyTextMaps: ToyTextMap[]
    continueButton?: choiceMiniButton

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.setDepth(2)
        this.scene = scene

        // Инициализация фона
        this.title = scene.add.image(CONFIG.SCREENWIDTH / 2, 140, MOODULEONE.TOYSGAME.title)
        this.background = scene.add.image(0, 0, MOODULEONE.BACKGROUNDS.TOYSGAME)
            .setOrigin(0, 0)
            .setScale(1)
            .setAlpha(0)
            .setDepth(0)

        scene.tweens.add({
            targets: [this.background],
            alpha: 1,
            ease: 'Linear',
            duration: 1000
        })
        this.add(this.background)
        this.add(this.title)

        // TEXTS
        this.frisbitext = scene.add.image(264, 306, MOODULEONE.TOYSGAME.frisbitext).setOrigin(0, 0)
        this.vorottext = scene.add.image(952, 639, MOODULEONE.TOYSGAME.vorottext).setOrigin(0, 0)
        this.toytext = scene.add.image(374, 600, MOODULEONE.TOYSGAME.toytext).setOrigin(0, 0)
        this.cunttext = scene.add.image(1443, 258, MOODULEONE.TOYSGAME.cunttext).setOrigin(0, 0)
        this.kongtext = scene.add.image(1689, 366, MOODULEONE.TOYSGAME.kongtext).setOrigin(0, 0)

        // TOYS
        this.frisbiicon = scene.add.image(504, 948, MOODULEONE.TOYSGAME.frisbiicon).setOrigin(0, 0).setInteractive()
        this.voroticon = scene.add.image(1657, 844, MOODULEONE.TOYSGAME.voroticon).setOrigin(0, 0).setInteractive()
        this.toyicon = scene.add.image(1351, 865, MOODULEONE.TOYSGAME.toyicon).setOrigin(0, 0).setInteractive()
        this.cunticon = scene.add.image(538, 190, MOODULEONE.TOYSGAME.cunticon).setOrigin(0, 0).setInteractive()
        this.kongicon = scene.add.image(117, 727, MOODULEONE.TOYSGAME.kongicon).setOrigin(0, 0).setInteractive()

        // Добавить объекты в контейнер
        this.add(this.frisbitext.setDepth(1))
        this.add(this.vorottext.setDepth(1))
        this.add(this.toytext.setDepth(1))
        this.add(this.cunttext.setDepth(1))
        this.add(this.kongtext.setDepth(1))
        this.add(this.frisbiicon.setDepth(2))
        this.add(this.voroticon.setDepth(2))
        this.add(this.toyicon.setDepth(2))
        this.add(this.cunticon.setDepth(2))
        this.add(this.kongicon.setDepth(2))

        this.soundEffect = scene.sound.add(MOODULEONE.AUDIO.COMPLETE)

        this.toyTextMaps = [
            { icon: this.frisbiicon, text: this.frisbitext, matched: false },
            { icon: this.voroticon, text: this.vorottext, matched: false },
            { icon: this.toyicon, text: this.toytext, matched: false },
            { icon: this.cunticon, text: this.cunttext, matched: false },
            { icon: this.kongicon, text: this.kongtext, matched: false }
        ]

        this.toyTextMaps.forEach(map => {
            this.enableDragging(map.icon, map.text)
        })
    }

    enableDragging(icon: Phaser.GameObjects.Image, targetText: Phaser.GameObjects.Image) {
        this.scene.input.setDraggable(icon)

        icon.on('drag', (pointer: any, dragX: number, dragY: number) => {
            icon.x = dragX
            icon.y = dragY
        })

        icon.on('dragend', () => {
            let map = this.toyTextMaps.find(map => map.icon === icon)
            if (map && Phaser.Geom.Intersects.RectangleToRectangle(icon.getBounds(), targetText.getBounds())) {
                map.matched = true
                icon.x = targetText.x + (targetText.width - icon.width) / 2
                icon.y = targetText.y + (targetText.height - icon.height) / 2
            } else if (map) {
                map.matched = false
            }

            if (this.allToysMatched()) {
                this.soundEffect?.play()
                this.showContinueButton()
            }
        })
    }

    allToysMatched(): boolean {
        return this.toyTextMaps.every(map => map.matched)
    }

    showContinueButton() {
        this.continueButton = new choiceMiniButton(this.scene, CONFIG.SCREENWIDTH - 200, CONFIG.SCREENHIGHT - 75, 'ПРОДОЛЖИТЬ')
            .setInteractive()
            .on('pointerdown', () => {
                store.dispatch(setScore(15))
                store.dispatch(setSavePoint('ModuleOneEnd'))
            })
        this.add(this.continueButton.setDepth(3))
    }
}