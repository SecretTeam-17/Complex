import { setCurrentScene } from '../../../redux/GameConfig/config.slice'
import { store } from '../../../redux/store'
import { MOODULEFOUR } from '../../constants/moduleFourConstants'
import { MOODULEONE } from '../../constants/moduleOneConstants'
import { MOODULETHREE } from '../../constants/moduleThreeConstants'
import { MOODULETWO } from '../../constants/moduleTwoConstants'
import ModuleCard from './moduleCard'
import ModuleCardMini from './moduleCardMini'

export default class ModuleCardSelector {

    // Определяем объекты класса
    cardSelector!: Phaser.GameObjects.Container

    private cardOne: ModuleCard
    private cardTwo: ModuleCard
    private cardThree: ModuleCard
    private cardFour: ModuleCard

    private cardOneMini: ModuleCardMini
    private carTwoMiniLeft: ModuleCardMini
    private cardTwoMiniRight: ModuleCardMini
    private cardThreeMiniLeft: ModuleCardMini
    private cardThreeMiniRight: ModuleCardMini
    private cardFourMini: ModuleCardMini

    private scene: Phaser.Scene

    isVisible = false

    scaleOne = 1
    scaleTwo = 0.95
    scaleThree = 0.90

    constructor(scene: Phaser.Scene, x: number, y: number) {

        this.scene = scene

        const state = store.getState()

        this.cardSelector = scene.add.container(x, y).setScale(1).setDepth(1)

        // Карточки модулей
        this.cardOne = new ModuleCard(scene, 0, 0, MOODULEONE.TITLE, MOODULEONE.TOTALCOUNTS, MOODULEONE.PREIMAGE, state.config.score, state.game.modules.moduleOne.isAvailable)
        this.cardTwo = new ModuleCard(scene, 70, 0, MOODULETWO.TITLE, MOODULETWO.TOTALCOUNTS, MOODULETWO.PREIMAGE, state.game.modules.moduleTwo.score, state.game.modules.moduleTwo.isAvailable)
        this.cardThree = new ModuleCard(scene, 140, 0, MOODULETHREE.TITLE, MOODULETHREE.TOTALCOUNTS, MOODULETHREE.PREIMAGE, state.game.modules.moduleThree.score, state.game.modules.moduleThree.isAvailable)
        this.cardFour = new ModuleCard(scene, 210, 0, MOODULEFOUR.TITLE, MOODULEFOUR.TOTALCOUNTS, MOODULEFOUR.PREIMAGE, state.game.modules.moduleFour.score, state.game.modules.moduleFour.isAvailable)

        //Маленькие карточки
        this.cardOneMini = new ModuleCardMini(scene, 40, 470, MOODULEONE.TITLE)
        this.cardOneMini.container.setRotation(-1.5708)

        this.carTwoMiniLeft = new ModuleCardMini(scene, 110, 470, MOODULETWO.TITLE)
        this.carTwoMiniLeft.container.setRotation(-1.5708)

        this.cardTwoMiniRight = new ModuleCardMini(scene, 440, 470, MOODULETWO.TITLE)
        this.cardTwoMiniRight.container.setRotation(-1.5708)

        this.cardThreeMiniLeft = new ModuleCardMini(scene, 180, 470, MOODULETHREE.TITLE)
        this.cardThreeMiniLeft.container.setRotation(-1.5708)

        this.cardThreeMiniRight = new ModuleCardMini(scene, 510, 460, MOODULETHREE.TITLE)
        this.cardThreeMiniRight.container
            .setRotation(-1.5708)
            .setScale(this.scaleTwo)

        this.cardFourMini = new ModuleCardMini(scene, 580, 450, MOODULEFOUR.TITLE)
        this.cardFourMini.container
            .setRotation(-1.5708)
            .setScale(this.scaleThree)





        // Добавляем карточки в контейнер
        this.cardSelector.add(this.cardFourMini.container)
        this.cardSelector.add(this.cardThreeMiniRight.container)
        this.cardSelector.add(this.cardTwoMiniRight.container)
        this.cardSelector.add(this.cardOneMini.container.setAlpha(0))
        this.cardSelector.add(this.carTwoMiniLeft.container.setAlpha(0))
        this.cardSelector.add(this.cardThreeMiniLeft.container.setAlpha(0))


        this.cardSelector.add(this.cardOne.container)
        this.cardSelector.add(this.cardTwo.container.setAlpha(0))
        this.cardSelector.add(this.cardThree.container.setAlpha(0))
        this.cardSelector.add(this.cardFour.container.setAlpha(0))

        this.cardOneMini.panel.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.moduleOneButton()
            })

        this.cardTwoMiniRight.panel.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.moduleTwoButton()
            })

        this.carTwoMiniLeft.panel.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.moduleTwoButton()
            })

        this.cardThreeMiniRight.panel.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.moduleThreeButton()
            })

        this.cardThreeMiniLeft.panel.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.moduleThreeButton()
            })

        this.cardFourMini.panel.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.moduleFourButton()
            })

        this.cardOne.hoverImage.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.scene.cameras.main.fadeOut(500, 0, 0, 0, (_camera: any, progress: number) => {
                    if (progress === 1) {
                        store.dispatch(setCurrentScene('ModuleOne'))
                        this.scene.scene.start('ModuleOne')

                    }
                })
            })
    }

    hideAllCards() {
        this.cardOne.container.setAlpha(0)
        this.cardTwo.container.setAlpha(0)
        this.cardThree.container.setAlpha(0)
        this.cardFour.container.setAlpha(0)
    }

    hideAllCardsMini() {
        this.cardOneMini.container.setAlpha(0)
        this.cardThreeMiniRight.container.setAlpha(0)
        this.cardTwoMiniRight.container.setAlpha(0)
        this.cardFourMini.container.setAlpha(0)
        this.carTwoMiniLeft.container.setAlpha(0)
        this.cardThreeMiniLeft.container.setAlpha(0)
    }

    moduleOneButton() {
        this.hideAllCards()
        this.hideAllCardsMini()

        this.cardOne.container.setAlpha(1)
        this.cardTwoMiniRight.container.setAlpha(1).setScale(this.scaleOne).setY(470)
        this.cardThreeMiniRight.container.setAlpha(1).setScale(this.scaleTwo).setY(460)
        this.cardFourMini.container.setAlpha(1).setScale(this.scaleThree).setY(450)
    }

    moduleTwoButton() {
        this.hideAllCards()
        this.hideAllCardsMini()

        this.cardTwo.container.setAlpha(1)
        this.cardThreeMiniRight.container.setAlpha(1).setScale(this.scaleOne).setY(470)
        this.cardFourMini.container.setAlpha(1).setScale(this.scaleTwo).setY(460)
        this.cardOneMini.container.setAlpha(1)
    }

    moduleThreeButton() {
        this.hideAllCards()
        this.hideAllCardsMini()

        this.cardThree.container.setAlpha(1)
        this.cardFourMini.container.setAlpha(1).setScale(this.scaleOne).setY(470)
        this.cardOneMini.container.setAlpha(1).setScale(this.scaleTwo).setY(460)
        this.carTwoMiniLeft.container.setAlpha(1).setScale(this.scaleOne).setY(470)
    }

    moduleFourButton() {
        this.hideAllCards()
        this.hideAllCardsMini()

        this.cardFour.container.setAlpha(1)
        this.cardOneMini.container.setAlpha(1).setScale(this.scaleThree).setY(450)
        this.carTwoMiniLeft.container.setAlpha(1).setScale(this.scaleTwo).setY(460)
        this.cardThreeMiniLeft.container.setAlpha(1).setScale(this.scaleOne).setY(470)
    }
}