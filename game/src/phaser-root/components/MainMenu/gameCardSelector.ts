import { GAMEFOUR, GAMEONE, GAMETHREE, GAMETWO } from '../../constants/miniGamesConstants'
import GameCard from './gameCard'
import ModuleCardMini from './moduleCardMini'

export default class GameCardSelector {

    // Определяем объекты класса
    cardSelector!: Phaser.GameObjects.Container
    private cardOne: GameCard
    private cardTwo: GameCard
    private cardThree: GameCard
    private cardFour: GameCard
    private cardOneMini: ModuleCardMini
    private cardTwoMiniLeft: ModuleCardMini
    private cardTwoMiniRight: ModuleCardMini
    private cardThreeMiniLeft: ModuleCardMini
    private cardThreeMiniRight: ModuleCardMini
    private cardFourMini: ModuleCardMini

    scaleOne = 1
    scaleTwo = 0.95
    scaleThree = 0.90

    constructor(scene: Phaser.Scene, x: number, y: number) {

        this.cardSelector = scene.add.container(x, y).setScale(1).setDepth(1)

        // Карточки модулей
        this.cardOne = new GameCard(scene, 0, 0, GAMEONE.TITLE, GAMEONE.PREIMAGE, GAMEONE.isAvailable)
        this.cardTwo = new GameCard(scene, 70, 0, GAMETWO.TITLE, GAMETWO.PREIMAGE, GAMETWO.isAvailable)
        this.cardThree = new GameCard(scene, 140, 0, GAMETHREE.TITLE, GAMETHREE.PREIMAGE, GAMETHREE.isAvailable)
        this.cardFour = new GameCard(scene, 210, 0, GAMEFOUR.TITLE, GAMEFOUR.PREIMAGE, GAMEFOUR.isAvailable)

        //Маленькие карточки
        this.cardOneMini = new ModuleCardMini(scene, 40, 470, GAMEONE.TITLE)
        this.cardOneMini.container.setRotation(-1.5708)

        this.cardTwoMiniLeft = new ModuleCardMini(scene, 110, 470, GAMETWO.TITLE)
        this.cardTwoMiniLeft.container.setRotation(-1.5708)

        this.cardTwoMiniRight = new ModuleCardMini(scene, 440, 470, GAMETWO.TITLE)
        this.cardTwoMiniRight.container.setRotation(-1.5708)

        this.cardThreeMiniLeft = new ModuleCardMini(scene, 180, 470, GAMETHREE.TITLE)
        this.cardThreeMiniLeft.container.setRotation(-1.5708)
        this.cardThreeMiniRight = new ModuleCardMini(scene, 510, 460, GAMETHREE.TITLE)
        this.cardThreeMiniRight.container
            .setRotation(-1.5708)
            .setScale(this.scaleTwo)

        this.cardFourMini = new ModuleCardMini(scene, 580, 450, GAMEFOUR.TITLE)
        this.cardFourMini.container
            .setRotation(-1.5708)
            .setScale(this.scaleThree)

        // Добавляем карточки в контейнер
        this.cardSelector.add(this.cardFourMini.container)
        this.cardSelector.add(this.cardThreeMiniRight.container)
        this.cardSelector.add(this.cardTwoMiniRight.container)
        this.cardSelector.add(this.cardOneMini.container.setAlpha(0))
        this.cardSelector.add(this.cardTwoMiniLeft.container.setAlpha(0))
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

        this.cardTwoMiniLeft.panel.setInteractive()
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
        this.cardTwoMiniLeft.container.setAlpha(0)
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
        this.cardTwoMiniLeft.container.setAlpha(1).setScale(this.scaleOne).setY(470)
    }

    moduleFourButton() {
        this.hideAllCards()
        this.hideAllCardsMini()

        this.cardFour.container.setAlpha(1)
        this.cardOneMini.container.setAlpha(1).setScale(this.scaleThree).setY(450)
        this.cardTwoMiniLeft.container.setAlpha(1).setScale(this.scaleTwo).setY(460)
        this.cardThreeMiniLeft.container.setAlpha(1).setScale(this.scaleOne).setY(470)
    }
}